<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CadEstado;

class EstadoController extends Controller
{
    public function index() /*lista todos os dados de estado/basicamente um GET*/ 
    {
        return response()->json(CadEstado::all());
    }

    public function store(Request $request) /*cria novos dados na tabela/basicamente um POST*/ 
    {
        $request->validate([
            'descricao' => 'required|string',
            'sigla'     => 'required|string|max:2',
        ]);

        $estado = CadEstado::create($request->all());
        return response()->json($estado, 201);
    }

    public function show(string $id) /*igual o index mas para apenas um dado específico/basicamente um GET*/  
    {
        $estado = CadEstado::findOrFail($id);
        return response()->json($estado);
    }

    public function update(Request $request, string $id) /*atualiza um dado específico na tabela/basicamente um PUT*/
    {
        $estado = CadEstado::findOrFail($id);
        $estado->update($request->all());
        return response()->json($estado);
    }

    public function destroy(string $id) /*deleta um dado específico da tabela/basicamente um DELETE*/
    {
        CadEstado::findOrFail($id)->delete();
        return response()->json(['message' => 'Estado removido com sucesso']);
    }
}