<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadPublicidade extends Model
{
    protected $table = 'cad_publicidade';

    protected $fillable = [
        'titulo', 'descricao', 'imagem',
        'botao_link', 'titulo_botao_link',
        'dt_inicio', 'dt_fim'
    ];

    public function estados()
    {
        return $this->belongsToMany(CadEstado::class, 'cad_publicidade_estado', 'id_publicidade', 'id_estado');
    }
}