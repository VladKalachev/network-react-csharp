# network-react-csharp

## Требования:
- .Net Core 2.2.207
- SQLite ( БД );

## Swagger
http://localhost:5000/swagger/index.html
Для разработки сервера используй команду
dotnet watch run /API

## Миграции
Создание db по миграции
dotnet ef migrations update -p Persistence/ -s API/
Создать новую миграцию
dotnet ef migrations add "NameMigration" -p Persistence/ -s API/
