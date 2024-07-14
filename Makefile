build:
	docker compose up -d --build
down:
	docker compose down --rmi all -v
status:
	docker compose ps
app:
	docker compose exec app bash