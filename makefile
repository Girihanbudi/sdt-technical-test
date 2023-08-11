APP_NAME="sdt-technical-test"

# Run application in dev mode
rundev:
	npm run dev

# Run application
start:
	npm run build && npm run start

# Create all environments needed in docker compose
environments:
	cd ./dev && docker-compose -p $(APP_NAME) up -d

# Create a schema migration
migration:
	npx prisma migrate dev --name init