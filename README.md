# Jonathan Cerqueira — site recuperado

Este repositório contém a reconstrução editável da versão publicada em `jonathancerqueira.com.br` em 3 de agosto de 2026.

## O que foi preservado

- conteúdo e estrutura completos da página inicial;
- textos, links e metadados de SEO;
- guia lateral recolhível;
- modo claro e escuro;
- constelação interativa;
- paisagem sonora gerada no navegador;
- responsividade para computador e celular.

## Arquivos

- `index.html` — conteúdo da página inicial;
- `styles.css` — aparência, temas e responsividade;
- `app.js` — sidebar, tema, constelação e som;
- `RECOVERY_MANIFEST.json` — registro da recuperação.

## Abrir localmente

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Segurança de publicação

Este repositório não possui automação de deploy e não está conectado ao domínio principal. A produção deve permanecer desconectada até revisão visual e aprovação explícita.

## Limitação conhecida

A página inicial foi recuperada integralmente. As páginas internas continuam sendo abertas no site público atual até que cada rota seja capturada e reconstruída separadamente.

Uma cópia integral com HTML renderizado original, imagens incorporadas e referência visual foi preservada separadamente na Biblioteca do ChatGPT em `/Sites/jonathan-cerqueira-site-recuperado.zip`.
