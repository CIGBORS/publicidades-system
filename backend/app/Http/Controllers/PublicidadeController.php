<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CadPublicidade;

class PublicidadeController extends Controller
{
    public function index() /*lista todos os dados de estado/basicamente um GET*/
    {
        $publicidades = CadPublicidade::with('estados')->get();
        return response()->json($publicidades);
    }

    public function store(Request $request) /*cria novos dados na tabela/basicamente um POST*/

    {
        $request->validate([
            'titulo'            => 'required|string',
            'descricao'         => 'required|string',
            'imagem'            => 'required|file|mimes:jpg,jpeg,png,webp',
            'botao_link'        => 'required|string',
            'titulo_botao_link' => 'required|string',
            'dt_inicio'         => 'required|date',
            'dt_fim'            => 'required|date|after_or_equal:dt_inicio',
            'estados'           => 'required|array|min:1',
        ]);

        $imagemPath = $request->file('imagem')->store('publicidades', 'public');

        $publicidade = CadPublicidade::create([
            'titulo'            => $request->titulo,
            'descricao'         => $request->descricao,
            'imagem'            => $imagemPath,
            'botao_link'        => $request->botao_link,
            'titulo_botao_link' => $request->titulo_botao_link,
            'dt_inicio'         => $request->dt_inicio,
            'dt_fim'            => $request->dt_fim,
        ]);

        $publicidade->estados()->attach($request->estados);

        return response()->json($publicidade->load('estados'), 201);
    }

    public function show(string $id) /*igual o index mas para apenas um dado específico/basicamente um GET*/
    {
        $publicidade = CadPublicidade::with('estados')->findOrFail($id);
        return response()->json($publicidade);
    }

    public function update(Request $request, string $id) /*atualiza um dado específico na tabela/basicamente um PUT*/
    {
        $publicidade = CadPublicidade::findOrFail($id);

        if ($request->hasFile('imagem')) {
            $imagemPath = $request->file('imagem')->store('publicidades', 'public');
            $publicidade->imagem = $imagemPath;
        }

        $publicidade->update($request->except(['imagem', 'estados']));

        if ($request->has('estados')) {
            $publicidade->estados()->sync($request->estados);
        }

        return response()->json($publicidade->load('estados'));
    }

    public function destroy(string $id) /*deleta um dado específico da tabela/basicamente um DELETE*/
    {
        CadPublicidade::findOrFail($id)->delete();
        return response()->json(['message' => 'Publicidade removida com sucesso']);
    }
}