
describe("Teste Nome",function(){
    it("Validacao Nome - Regex", function(){
        var result = verificaName('Rafael Alves Silav');
         expect(result).toEqual(true);
         var result = verificaName('user1910');
         
         expect(result).toEqual(false);
    });
});
describe("Teste Cpf",function(){
    it("Teste Regex Mask Cpf - Com ou sem Mascara", function(){
        var caracter = cpf('1');
         expect(caracter).toEqual('1');
         var caracter = cpf('a');
         expect(caracter).toEqual('');
    });
});
describe("Validacao Cpf",function(){
    it("Validacao Cpf Valido", function(){
         // Cpf Valido - Apenas numeros
         var cpf = "10844681660";
         result = TestaCPF(cpf);
         expect(result).toEqual(true);
         // Passando Cpf Valido - Com mascara
         var cpf = "108.446.816-60";
         result = TestaCPF(cpf);
         expect(result).toEqual(true);
          // Cpf invalido
         var cpf = "108.909.987-90";
         result = TestaCPF(cpf);
         expect(result).toEqual(false);
    });
});
describe("Validacao Telefone",function(){
    it("Validacao telefone - 8 e 9 digitos", function(){
         // Teste 9 Digitos
         var num = "34998951511";
         var result = mtel(num);
         expect(result).toEqual("(34) 99895-1511");
         // Teste 8 Digitos
         var num = "3498951511";
         var result = mtel(num);
         expect(result).toEqual("(34) 9895-1511");

    });
});
