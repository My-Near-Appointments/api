# My Near Appointments - Back-end

Projeto escrito com [NestJS](https://nestjs.com/)

Para rodar este projeto localmente utilizando Docker, siga os passos abaixo:

1. Certifique-se de que o Docker esteja instalado em sua máquina. Caso não esteja, visite [Docker](https://www.docker.com/get-started) para instruções de instalação.

2. Clone o repositório do projeto para sua máquina local.

3. Abra um terminal e navegue até a pasta raiz do projeto clonado.

4. Execute o comando `docker build -t my-near-appointments-backend .` para construir a imagem Docker do projeto. Este processo pode levar alguns minutos.

5. Após a construção da imagem, execute o comando `docker run -d -p 3000:3000 my-near-appointments-backend` para iniciar o container. O projeto estará acessível através do endereço `http://localhost:3000`.

6. Para parar o container, utilize o comando `docker stop <container_id>`, substituindo `<container_id>` pelo ID do seu container.

Com esses passos, você será capaz de rodar o projeto localmente utilizando Docker.


# Visão Geral da Aplicação

Esta aplicação é um serviço de backend robusto e escalável construído com NestJS. Foi projetado para gerenciar usuários e empresas.

## Estrutura de Pastas

A estrutura de pastas da aplicação segue o padrão de módulos do NestJS. Cada módulo tem sua própria pasta, que contém arquivos para Controllers, DTOs, Use Cases e Guards. Aqui está um mapa de caminho para a estrutura de pastas:

```
src/
├── modules/
│   ├── user/
│   │   ├── dtos/
│   │   ├── infra/
│   │   ├── controllers/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── tests/
│   │   ├── usecases/
│   ├── company/
│   │   ├── dtos/
│   │   ├── infra/
│   │   ├── controllers/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── tests/
│   │   ├── usecases/
│   ├── auth/
│   │   ├── dtos/
│   │   ├── infra/
│   │   ├── controllers/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── tests/
│   │   ├── usecases/
│   ├── appointment/
│   │   ├── dtos/
│   │   ├── infra/
│   │   ├── controllers/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── tests/
│   │   ├── usecases/
│   ├── employee/
│   │   ├── dtos/
│   │   ├── infra/
│   │   ├── controllers/
│   │   ├── providers/
│   │   ├── repositories/
│   │   ├── tests/
│   │   ├── usecases/
├── shared/
│   ├── infra/
│   │   ├── exception-filters/
│   │   ├── infra/
```

## Swagger
A documentação da API é feita utilizando o Swagger, que é uma ferramenta de descrição de interface para descrever APIs RESTful expressas usando JSON. O Swagger é usado para ajudar a planejar e documentar a API de forma interativa. Isso permite que tanto os desenvolvedores quanto os usuários finais compreendam rapidamente as capacidades de uma API sem ter acesso direto ao código-fonte.

Para acessar a documentação da API gerada pelo Swagger, você precisa iniciar o servidor da aplicação. Uma vez que o servidor esteja rodando, você pode acessar a UI (Interface de Usuário) do Swagger pelo navegador web. A URL padrão para acessar a documentação do Swagger é:
Abra [http://localhost:3000/api](http://localhost:3000/api)

## Arquitetura Limpa

A aplicação segue os princípios da Arquitetura Limpa. Os casos de uso encapsulam a lógica de negócios e são independentes de qualquer detalhe externo, como o banco de dados ou o framework web. Os Controllers e DTOs são responsáveis pela entrada e saída de dados, enquanto os Guards protegem certas rotas.

## Módulos

A aplicação é dividida em vários módulos:

1. Módulo de User: Este módulo é responsável por lidar com todas as operações relacionadas aos usuários, como criar um novo usuário, validar credenciais do usuário, etc. Ele usa DTOs (Data Transfer Objects) para lidar com a validação e transferência de dados.

2. Módulo de Company: Este módulo é responsável por gerenciar empresas. Ele permite operações como criar, listar, atualizar empresas e alternar seu status.

3. Módulo de Auth: Este módulo é responsável por autenticar usuários e gerenciar sessões.

4. Módulo de Appointment: Este módulo é responsável por gerenciar agendamentos.

5. Módulo de Employee: Este módulo é responsável por gerenciar funcionários.

6. Módulo Shared: Este módulo contém código que é compartilhado entre os outros módulos, como Guards e infraestrutura comum.

## Controladores

Cada módulo tem seu próprio controlador:

1. UserController: Lida com todas as solicitações HTTP relacionadas aos usuários. Ele usa CreateUserUseCase para criar um novo usuário.

2. CompanyController: Lida com todas as solicitações HTTP relacionadas às empresas. Ele usa vários casos de uso como CreateCompanyUseCase, ListCompanyUseCase, UpdateCompanyUseCase e ToggleStatusUseCase para lidar com diferentes operações.

3. AuthController: Lida com todas as solicitações HTTP relacionadas à autenticação. Ele usa vários casos de uso para lidar com operações de autenticação.

4. AppointmentController: Lida com todas as solicitações HTTP relacionadas aos agendamentos. Ele usa vários casos de uso como CreateAppointmentUseCase, DeleteAppointmentUseCase e UpdateAppointmentUseCase para lidar com diferentes operações.

5. EmployeeController: Lida com todas as solicitações HTTP relacionadas aos funcionários. Ele usa vários casos de uso para lidar com diferentes operações.

## Guards

A aplicação usa Guards para proteger certas rotas. Por exemplo, o CompanyAdminGuard é usado para proteger rotas que só devem ser acessíveis por administradores de empresas.

## Swagger

A aplicação usa Swagger para documentação da API. Cada método do controlador é decorado com decoradores ApiTags e ApiResponse para gerar a UI do Swagger.

## Passport

A aplicação usa Passport para lidar com a autenticação. O AuthGuard do Passport é usado no CompanyController para proteger certas rotas.

