# ABC Cargas — ambiente separado vazio (v4)

Este pacote usa um PostgreSQL NOVO e um serviço web NOVO. Não atualize o serviço antigo.
Cria somente empresa, configurações e Michele Shibata (administradora, michele@abccargas.local).
Nenhum pátio, veículo, motorista, reserva, foto, manutenção, abastecimento ou alerta inicial.
O catálogo de modelos/ilustrações e as regras funcionais continuam disponíveis.

A senha inicial vem de SEED_PASSWORD (mínimo 12 caracteres). Não há senha padrão.
O seed é transacional e idempotente. Reinícios preservam dados novos e senhas alteradas.
Migração, seed e servidor recusam bancos existentes sem a identidade desta edição.
Não há comando de exclusão ou limpeza de dados antigos.

Leia PUBLICAR_AMBIENTE_SEPARADO.md para publicar pelo navegador.
