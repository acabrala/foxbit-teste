
# Mars Rover

Este projeto é uma simulação do problema do Rover em Marte, desenvolvido em TypeScript e organizado seguindo os princípios da Arquitetura Limpa. Isso garante que o código seja modular, fácil de escalar e simples de testar.

## Visão Geral e Premissas

O sistema foi pensado para manter as responsabilidades bem separadas, dividindo o código em quatro camadas principais:

- **Domínio**: Aqui fica o núcleo do negócio, com as regras e entidades principais, como o `Rover`, `Plateau`, `Position`, `Direction`, o `Logger` e erros personalizados. Essa camada não depende de nenhuma biblioteca externa, o que ajuda a manter o código limpo e independente.
- **Casos de Uso**: Essa parte faz a ponte entre o domínio e as camadas externas, coordenando o fluxo dos dados e as regras específicas da aplicação.
- **Adaptadores**: Responsáveis por transformar dados vindos de fora (por exemplo, um arquivo) para o formato que o sistema entende.
- **Main**: O ponto de entrada da aplicação, que inicializa tudo e conecta as diferentes partes.

### Escalabilidade

Para lidar bem com vários rovers ao mesmo tempo, foi implementado um `RoverPool`. Isso evita criar e destruir objetos de rover repetidamente, ajudando a melhorar a performance e a economia de memória.

### Tratamento de Erros e Logs

O projeto conta com um sistema robusto de tratamento de erros e registro de logs para facilitar o monitoramento e garantir que o sistema seja mais resistente.

- **Erros personalizados**: Foram criados tipos específicos de erro (`InvalidInstructionError`, `OutOfBoundsError`, `FileReadError`), o que facilita identificar e tratar problemas com mais precisão.
- **Logger**: Um logger simples (`ILogger`) está presente em toda a aplicação, e a implementação padrão (`ConsoleLogger`) registra mensagens no console com timestamps e níveis de log, ajudando no acompanhamento da execução.

### Boas Práticas (Princípios SOLID)

O código foi estruturado para seguir os princípios SOLID, tornando-o mais fácil de entender, manter e evoluir.

### Considerações

- Espera-se que o arquivo de entrada esteja bem formatado, seguindo o padrão especificado.
- O canto inferior esquerdo do plateau é sempre (0, 0).
- O rover não se move se a próxima posição estiver fora dos limites do plateau.

## Como Rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute a aplicação:**
   ```bash
   npm run start
   ```
   A aplicação vai ler o arquivo `input.txt` e mostrar no console a posição final de cada rover.

3. **Execute os testes:**
   ```bash
   npm test
   ```

## Estrutura do Projeto

```
.
├── jest.config.js
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── adapters
│   │   └── FileAdapter.ts
│   ├── domain
│   │   ├── errors.ts
│   │   ├── Logger.ts
│   │   ├── Plateau.ts
│   │   ├── Rover.ts
│   │   └── types.ts
│   ├── main
│   │   └── index.ts
│   └── useCases
│       └── ProcessInstructionsUseCase.ts
├── tests
│   └── domain
│       ├── Plateau.test.ts
│       └── Rover.test.ts
└── tsconfig.json
```
