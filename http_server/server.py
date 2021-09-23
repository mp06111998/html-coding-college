"""An example of a simple HTTP server."""
from __future__ import print_function

import socket
import mimetypes

# Port number
from urllib import parse

PORT = 8080

# Header template for a successful HTTP request
# Return this header (+ content) when the request can be
# successfully fulfilled
HEADER_RESPONSE_200 = """HTTP/1.1 200 OK
Content-Type: %s
Content-Length: %d
Connection: Close

"""

# Template for a 404 (Not found) error: return this when
# the requested resource is not found
RESPONSE_404 = """HTTP/1.1 404 Not found
Content-Type: text/html; charset=utf-8
Connection: Close

<!DOCTYPE html>
<h1>404 Page not found</h1>
<p>Page cannot be found.</p>
"""
def parse_headers(client):
    headers = {}

    while True:
        line = client.readline().decode("utf-8").strip()

        if line == "":
            return headers

        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        headers[key] = value

def process_request(connection, address, port):
    client = connection.makefile("wrb")

    try:
        verb, uri, version = client.readline().decode("utf-8").strip().split()
        assert verb == "GET", "Invalid verb: %s" % verb
        assert len(uri) > 0 and uri[0] == "/", "Invalid request URI"
        assert version == "HTTP/1.1", "Invalid version: %s" % version
        print(verb, uri, version)

    except (ValueError, AssertionError) as error:
        #response = "Invalid request"
        print("[%s:%d] ERROR: Invalid request line: %s" % (address, port, error))
        return

    headers = parse.headers(client)
    print("[%s:%d] %s %s %s %s" % (address, port, verb, uri, version, headers))

    try:
        with open(uri[1:], "rb") as handle:
            data = handle.read()

        mime_type, _ = mimetypes.guess_type(uri[1:])

        response_headers = HEADER_RESPONSE_200 % (mime_type, len(data))
        response = response_headers.encode("utf-8")+ data
    except FileNotFoundError as e:
        response = RESPONSE_404.encode("utf-8")

    #response_headers = HEADER_RESPONSE_200 % ("text/html", len(data))

    #client.write(response_headers.encode("utf-8"))
    client.write(response)

    client.close()


def main():
    """Starts the server and waits for connections."""

    # Create a TCP socket
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # To prevent "Address already in use" error while restarting the server,
    # set the reuse address socket option
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    # Bind on all network addresses (interfaces)
    server.bind(("", PORT))

    # Start listening and allow at most 1 queued connection
    server.listen(1)

    print("Listening on %d" % PORT)

    while True:
        # Accept the connection
        connection, (address, port) = server.accept()
        print("[%s:%d] CONNECTED" % (address, port))

        # Process request
        process_request(connection, address, port)

        # Close the socket
        connection.close()
        print("[%s:%d] DISCONNECTED" % (address, port))


if __name__ == "__main__":
    main()
