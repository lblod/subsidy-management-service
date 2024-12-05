# subsidy-applications-retrieval-service

Service to manage subsidies, used for the internal management tool.

This includes but is not limited to:

- Access subsidy forms by name

## Setup

### Within a [`mu.semte.ch`](https://github.com/mu-semtech) stack

Paste the following snip-it in your `docker-compose.yml`:

```yaml
version: '3.4'

services:
  subsidy-management:
    image: lblod/subsidy-applications-retrieval-service
    volumes:
      - ./config/subsidy-applications-retrieval-service:/config

```

### Development

```yaml
  subsidy-management:
    image: semtech/mu-javascript-template:1.6.0
    environment:
      NODE_ENV: "development"
    ports:
      - 8888:80
    volumes:
      - /home/username/subsidy-applications-retrieval-service/:/app/ # Update this to the absolute path of the subsidy-applications-retrieval-service folder
      - ./config/subsidy-application-management:/config # Links to subsidy forms
```
