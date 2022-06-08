<h1 align="left">
  <img width="20%" alt="Docker" title="#Docker" src="https://user-images.githubusercontent.com/20192309/172686968-bf09e3f2-f46b-47a4-9e73-0811c481bfe5.png" />
</h1>

# Docker e Docker Compose

#### Nesse guia veremos como instalar o Docker e Docker Compose nos principais sistemas operacionais

<!--ts-->
   * [Instalação do Docker](#instalacao-do-docker)
      * [Windows (64 Bit)](#windows)
      * [Mac OSX](#mac-osx)
      * [Linux (Ubuntu/Debian)](#linux)
   * [Instalação do Docker Compose](#instalacao-do-docker-compose)
      * [Linux (Ubuntu/Debian)](#linux-ubuntu-debian)
<!--te-->

## Instalação do Docker <a name="instalacao-do-docker"></a>

<p>O Docker é uma ferramenta sensacional que nos permite pular as etapas chatas de configuração de serviços para nossa aplicação. Além disso, ele permite reaproveitarmos o Kernel da máquina hospedeira entre vários serviços executados simultaneamente, conhecidos como containers.</p>
<p>Para iniciar a instalação do Docker vamos prosseguir para a seção "Get Started" presente no site da ferramenta: </p>

> [Get Started](https://www.docker.com/get-started/)

## Windows (64 Bit) <a name="windows"></a>

<p>O Docker no Windows possui alguns requisitos: </p>

<ul>
    <li>Microsoft Windows 10 Professional  ou Enterprise 64-bit</li>
    <li>Caso você possua o Windows 10 Home 64-bit também é possível usar o Docker mas será necessário instalar o WSL2 também (o instalador já se encarrega disso para você)</li>
</ul>

> :warning: Caso você possua o Windows 32-bit, não será possível realizar a instalação do Docker.

> :warning: Para que o restart da aplicação funcione corretamente ao salvar o código, é preciso que o projeto esteja na partição do Linux (WSL). 
> Para mais informações: 
> [Docker Docs - Windows - Best Practices](https://docs.docker.com/desktop/windows/wsl/#best-practices) <br />
> Outra alternativa é adicionando a flag **--poll** no script **"dev"**.

<p>Caso tenha todos os requisitos, então faça a instalação do Docker para Windows:</p>

> [Docker Desktop for Mac and Windows](https://www.docker.com/products/docker-desktop)

<p>Depois de instalar o Docker e abrir o software você já está pronto para continuar. Lembrando que essa versão do Docker para Windows tem uma interface visual muito bacana, ou seja, você pode usar a interface para visualizar os serviços sendo executados, logs, imagens e muito mais.

Para verificar que o Docker foi instalado corretamente, em **uma nova janela** do terminal execute:</p>

```shell
docker version
```

## Mac OSX <a name="mac-osx"></a>

<p>No macOS o processo de instalação do Docker é extremamente simples, você precisa apenas baixar o app executável e executa-lo na máquina para iniciar o Docker:</p>

[Docker Desktop for Mac - Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

<p>Depois de aberto você pode garantir que o Docker foi instalado corretamente executando o comando abaixo em uma nova janela do terminal:</p>

```shell
docker version
```

## Linux (Ubuntu/Debian) <a name="linux"></a>

<p>No Linux, vamos instalar o Docker utilizando o apt, para isso, em seu terminal, execute os comandos abaixo:</p>

```shell
sudo apt update
sudo apt remove docker docker-engine docker.io
sudo apt install docker.io
```

<p>Agora com o Docker instalado, vamos habilitar para que seu serviço seja iniciado automaticamente com o sistema:</p>

```shell
sudo systemctl start docker
sudo systemctl enable docker
```

<p>Para garantir que o Docker foi instalado da forma correta, execute no terminal:</p>

```shell
docker version
```

> :bulb: Você precisará executar todos comandos do Docker utilizando o sudo, mas caso queira executa-los sem o sudo,
> [utilize esse guia.](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)

## Instalação do Docker Compose <a name="instalacao-do-docker-compose"></a>

<p>Como visto durante as aulas, o Docker Compose precisará ser instalado apenas no Linux, já que nos demais sistemas ele já vem instalado junto com o Docker. </p>

## Linux (Ubuntu/Debian) <a name="linux-ubuntu-debian"></a>

<ul>
    <li>Rode o seguinte comando para instalar o Docker Compose:</li>
</ul>

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

<ul>
    <li>Aplique as permissões necessárias ao binário:</li>
</ul>

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

<p>Após isso, rode o comando <b>docker-compose --version</b> para assegurar que a instalação foi um sucesso. Caso retorne algum erro (mesmo reiniciando o terminal), crie um link simbólico para <b>usr/bin</b> com o seguinte comando:</p>

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

<p>Por fim, teste novamente com o comando <b>docker-compose --version</b> para checar se está tudo funcionando.</p>
