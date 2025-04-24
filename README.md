# CORS Anywhere - Dockerized Proxy

## About

Dockerized lightweight transparent HTTP(S) proxy with authentication and the possibility to alter headers. Based on [cors-anywhere](https://github.com/Rob--W/cors-anywhere).

This project provides a simple way to bypass CORS restrictions by running a proxy server. It supports API key authentication, header manipulation, and HTTPS with TLS certificates.

## Features

- **Proxy requests to bypass CORS restrictions.**
- **API Key Authentication**: Enforce access control using API keys.
- **Header Manipulation**: Add or remove headers from requests.
- **HTTPS Support**: Secure communication with TLS certificates.
- **Rate Limiting**: Prevent abuse with configurable rate limits.
- **Multi-Arch Docker Images**: Prebuilt images are available for multiple architectures.
- **Easy to set up and configure.**
- **Allows secure certificate management.**

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install cors-anywhere`.
3. Configure the `.env` file for your environment.
4. Start the server using `node server.js`.

## Folder Structure

- `.env`: Environment configuration file.
- `certificates/`: Directory for storing SSL certificates.

## Running with Docker Compose

Use the provided `docker-compose.yml` file to start the proxy server:

```sh
docker-compose up -d
```

This will:

- Map port `443` on the host to port `8080` in the container.
- Mount the `certificates` directory for TLS certificates.
- Restart the container automatically unless stopped.

### Multi-Arch Docker Images

Prebuilt multi-architecture Docker images are available at [gorus5/cors-anywhere](https://hub.docker.com/r/gorus5/cors-anywhere).

### Customization

You can customize the behavior of the proxy server using the following environment variables:

- `API_KEYS`: Comma-separated list of valid API keys.
- `REMOVE_HEADERS`: Comma-separated list of headers to remove from requests.
- `ADD_HEADERS`: JSON object specifying headers to add to requests.
- `CORSANYWHERE_BLACKLIST`: Comma-separated list of blacklisted origins.
- `CORSANYWHERE_WHITELIST`: Comma-separated list of whitelisted origins.
- `CERT` and `KEY`: Paths to the TLS certificate and private key.

### Stopping the Server

To stop the server, run:

```sh
docker-compose down
```

## License

This project is licensed under the MIT License. See the original [cors-anywhere](https://github.com/Rob--W/cors-anywhere) repository for more details.

---
This README.md is AI-generated based on the project code.
