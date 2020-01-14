<p align="center">
    <img width="1000" src="https://github.com/VladKalachev/network-react-csharp/blob/master/Reactivities/logo-new.png">
</p>

# Network React/C#
Социальная сеть с возможностью создани и мониторинга мероприятий

## Требования:
- .Net Core 2.2.207
- SQLite ( БД );

## Swagger
http://localhost:5000/swagger/index.html

## Разработка (Win)
dotnet watch run /API

## Миграции
- Создание db по миграции;
dotnet ef migrations update -p Persistence/ -s API/
- Создать новую миграцию;
dotnet ef migrations add "NameMigration" -p Persistence/ -s API/
- удаление db;
dotnet ef database drop -p Persistence/ -s API/

dotnet user-secrets set "TokenKey" "super secret key"
dotnet ef migrations add "UserActivityAdded" -p Persistence/ -s API/
