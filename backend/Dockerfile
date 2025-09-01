FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["TodoApp.Api/TodoApp.Api.csproj", "TodoApp.Api/"]
COPY ["TodoApp.Base/TodoApp.Base.csproj", "TodoApp.Base/"]
COPY ["TodoApp.Data/TodoApp.Data.csproj", "TodoApp.Data/"]
RUN dotnet restore "TodoApp.Api/TodoApp.Api.csproj" --disable-parallel
COPY . .
WORKDIR "/src/TodoApp.Api"
RUN dotnet build "TodoApp.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoApp.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5034
COPY --from=publish /app/publish .
# Remove the HTTPS configuration for simplicity in Docker
ENV ASPNETCORE_URLS=http://+:5034
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "TodoApp.Api.dll"]