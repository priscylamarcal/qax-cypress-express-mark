describe('Tarefas', () => {
    //it é um caso de teste
    it('Deve cadastrar uma nova tarefa', () => {
        /*
            Request é usada para enviar uma solicitação HTTP para um servidor externo
            Antes de começar o teste de fato, ele vai mandar uma requisição, onde está passando o método DELETE, onde vai procurar o texto escrito na variável nome e vai esperar a resposta dessa requisição, onde deverá ser igual ao código passado. 
            Isso é feito para garantir de que não haja mais de uma tarefa com o mesmo nome ao realizar o teste do cadastro e também para automatizar o teste, para não ficar alterando durante o teste de regressão.
            pq caso não fazer o request, ao gerar mais de uma vez o mesmo teste, o teste vai falhar, pois não pode ter mais de uma tarefa com o mesmo nome.
        */

        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3333/helper/tasks',
            body: { name: 'Ler um livro de node.js' },
        }).then((response) => {
            expect(response.status).to.eq(204);
        });

        //vai acessar a url
        cy.visit('http://localhost:8080/');

        /*# é um id. Quando no código já tem id, no próprio cypress se inspecionar ele já traz, porém, quando não tiver tem que fazer de outro jeito, tem que identificar outras propriedades
        cy.get('#newTask') */

        //vai pegar o campo e digitar o que está escrito no type
        cy.get('input[placeholder="Add a new Task"]').type(
            'Ler um livro de node.js'
        );

        /*
            elementos que começam com:
                # é um id
                . é uma classe
        */

        /*
            sintaxe:
                .contains(content)
                .contains(content, options)
                .contains(selector, content)
                .contains(selector, content, options)

                ---or---

                cy.contains(content)
                cy.contains(content, options)
                cy.contains(selector, content)
                cy.contains(selector, content, options)
        */
        //o contains verifica se no seletor BUTTON contém o texto CREATE, se achar, será realizado o clique, onde a tarefa é cadastrada
        cy.contains('button', 'Create').click();
    });
});
