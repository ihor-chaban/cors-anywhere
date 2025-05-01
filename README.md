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
- **SSL Certificate Auto-Renewal**: Automatically renews SSL certificates using Let's Encrypt.
- **Easy to set up and configure.**: Entire set up takes less than 5 minutes.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install cors-anywhere`.
3. Configure the `.env` file for your environment.
4. Start the server using `node server.js`.

## Folder Structure

- `.env`: Environment configuration file.
- `config/`: Directory for storing `nginx-proxy` and `acme-companion` files.
- `certificates/`: Directory for storing SSL certificates.

### Running with HTTPS and Auto-Renewal

To enable HTTPS with automatic SSL certificate renewal, use the `docker-compose.https-endpoint.yml` file. This setup uses `nginx-proxy` and `acme-companion` to manage SSL certificates via Let's Encrypt.

1. Ensure the `.env` file is configured with the following variables:
   - `LETSENCRYPT_EMAIL`: Your email address for Let's Encrypt notifications.
   - `LETSENCRYPT_HOST`: The domain name for which the SSL certificate will be issued.
   - `VIRTUAL_HOST`: The domain name to route traffic to the proxy server.
   - `VIRTUAL_PORT`: The internal port of the proxy server (default: `8080`).

2. Start the services:

```sh
docker-compose -f docker-compose.https-endpoint.yml -f docker-compose.yml up -d
```

This will:

- Set up an NGINX reverse proxy to handle HTTPS traffic.
- Automatically issue and renew SSL certificates using Let's Encrypt.
- Route traffic to the CORS Anywhere proxy server.

### Running Without HTTPS Auto-Renewal

If you prefer to run the proxy server without automatic SSL certificate renewal, you can use the `docker-compose.yml` file alone. This setup assumes you have already obtained and configured your SSL certificates manually.

1. Ensure the `.env` file is configured with the following variables:
   - `CERT`: Path to your SSL certificate file.
   - `KEY`: Path to your SSL private key file.

2. Start the services:

```sh
docker-compose up -d
```

This will:

- Start the CORS Anywhere proxy server.
- Use the provided SSL certificate and private key for HTTPS communication.
- Map port `443` on the host to port `8080` in the container.

Ensure your SSL certificate and private key are stored in the `certificates/` directory or another location accessible to the container, and update the paths in the `.env` file accordingly.

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

For the HTTPS setup:

```sh
docker-compose -f docker-compose.https-endpoint.yml -f docker-compose.yml down
```

## License

This project is licensed under the MIT License. See the original [cors-anywhere](https://github.com/Rob--W/cors-anywhere) repository for more details.

---
This `README.md` is AI-generated based on the project code.
