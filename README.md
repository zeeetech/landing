# /zeetech

Landing page da Zeetech, em [zeetech.io](https://zeetech.io).

Uma página só, escura, sem build e sem dependência: HTML, CSS e JavaScript no osso.

## Estrutura

| Arquivo      | Papel                                              |
| ------------ | -------------------------------------------------- |
| `index.html` | estrutura e conteúdo                               |
| `styles.css` | visual e tokens da marca                           |
| `main.js`    | navegação, formulário de briefing e o terminal `/` |
| `og.png`     | imagem de preview pra redes sociais                |

## Rodar localmente

É estático, então qualquer servidor serve:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Ou abra o `index.html` direto no navegador. Não tem passo de build.

## Detalhes

- O **formulário de briefing** monta um `mailto:` no cliente. Nada vai pra servidor
  nenhum, o e-mail abre já preenchido no app da pessoa.
- Aperte a tecla `/` em qualquer lugar da página pra abrir o menu de comandos.
- Acessibilidade: foco de teclado visível, `prefers-reduced-motion` respeitado, e o
  conteúdo continua visível mesmo com o JavaScript desligado.
