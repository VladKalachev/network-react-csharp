<p align="center">
  <a href="http://ant.design">
    <img width="200" src="https://github.com/VladKalachev/network-react-csharp/blob/master/Reactivities/client-app/public/assets/categoryImages/culture.jpg">
  </a>
</p>

# network-react-csharp

## Требования:
- .Net Core 2.2.207
- SQLite ( БД );

## Swagger
http://localhost:5000/swagger/index.html

## Разработка (Win)
dotnet watch run /API

## Миграции
Создание db по миграции
dotnet ef migrations update -p Persistence/ -s API/
Создать новую миграцию
dotnet ef migrations add "NameMigration" -p Persistence/ -s API/
