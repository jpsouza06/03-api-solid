# App

Gympass

## RFs

- [ ] Deve ser poss�vel se cadastrar;
- [ ] Deve ser poss�vel se autenticar;
- [ ] Deve ser poss�vel obter o peril de um usu�rio logado;
- [ ] Deve ser poss�vel obter o n�mero de check-ins realizados pelo usu�rio logado;
- [ ] Deve ser poss�vel o usu�rio obter seu hist�rico de check-ins;
- [ ] Deve ser poss�vel o usu�rio buscar academias pr�ximas;
- [ ] Deve ser poss�vel o usu�rio buscar academias pelo nome;
- [ ] Deve ser poss�vel o usu�rio realizar check-in em uma acedemia;
- [ ] Deve ser poss�vel validar o check-in de um usu�rio;
- [ ] Deve ser poss�vel cadastrar uma academia;

## RNs

- [ ] O usu�rio n�o deve poder se cadastrar com um e-mail duplicado;
- [ ] O usu�rio n�o pode fazer 2 check-ins no mesmo dia;
- [ ] O usu�rio n�o pode fazer check-in se n�o estiver perto(100m) da academia;
- [ ] O check-in s� pode ser validado ate 20 minutos ap�s criado;
- [ ] O check-in s� pode ser validado por administradores;
- [ ] A academia s� pode ser cadastrada por administradores;

## RNFs

- [ ] A senha do usu�rio precisa estar criptografada;
- [ ] Os dados da aplica��o precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por p�gina;
- [ ] O usu�rio deve ser identifcado por um JWT(JSON Web Token);