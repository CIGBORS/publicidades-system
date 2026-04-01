import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PublicidadeService } from '../../services/publicidade.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-publicidades',
  templateUrl: './publicidades.component.html',
  styleUrls: ['./publicidades.component.css']
})
export class PublicidadesComponent implements OnInit {

  publicidades: any[] = [];
  estadosOptions: any[] = [];
  publicidadesAtivas: any[] = [];
  publicidadesOutras: any[] = [];

  modalVisivel = false;
  filtroEstados: number[] = [];
  filtroBusca: string = ''; 
  publicidadesAtivasFiltradas: any[] = [];
  publicidadesOutrasFiltradas: any[] = [];
  modoEdicao = false;
  idEditando: number | null = null;
  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      titulo:            ['', Validators.required],
      descricao:         ['', Validators.required],
      botao_link:        ['', Validators.required],
      titulo_botao_link: ['', Validators.required],
      dt_inicio:         ['', Validators.required],
      dt_fim:            ['', Validators.required],
      estados:           [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarPublicidades();
  }
  filtrar(): void {
    let ativas = this.publicidadesAtivas;
    let outras = this.publicidadesOutras;

    if (this.filtroEstados.length > 0) {
      ativas = ativas.filter(p =>
        p.estados.some((e: any) => this.filtroEstados.includes(e.id))
      );
      outras = outras.filter(p =>
        p.estados.some((e: any) => this.filtroEstados.includes(e.id))
      );
    }

    if (this.filtroBusca) {
      const busca = this.filtroBusca.toLowerCase();
      ativas = ativas.filter(p => p.titulo.toLowerCase().includes(busca));
      outras = outras.filter(p => p.titulo.toLowerCase().includes(busca));
    }

    this.publicidadesAtivasFiltradas = ativas;
    this.publicidadesOutrasFiltradas = outras;
  }

getMenuItems(pub: any) {
  return [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.abrirModalEdicao(pub)
    },
    {
      label: 'Encerrar',
      icon: 'pi pi-times-circle',
      styleClass: 'text-red-500',
      command: () => this.encerrar(pub.id)
    }
  ];
}
  carregarEstados(): void {
    this.estadoService.listar().subscribe({
      next: (data) => {
        this.estadosOptions = data.map(e => ({
          label: e.descricao,
          value: e.id
        }));
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar estados' })
    });
  }

  carregarPublicidades(): void {
    this.publicidadeService.listar().subscribe({
      next: (data) => {
        const hoje = new Date();
        this.publicidadesAtivas = data.filter(p => {
          const inicio = new Date(p.dt_inicio);
          const fim = new Date(p.dt_fim);
          return inicio <= hoje && hoje <= fim;
        });
        this.publicidadesOutras = data.filter(p => {
          const inicio = new Date(p.dt_inicio);
          const fim = new Date(p.dt_fim);
          return !(inicio <= hoje && hoje <= fim);
        });
        this.publicidades = data;
        this.filtrar();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar publicidades' })
    });
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.idEditando = null;
    this.imagemSelecionada = null;
    this.imagemPreview = null;
    this.form.reset({ estados: [] });
    this.modalVisivel = true;
  }

  abrirModalEdicao(pub: any): void {
    this.modoEdicao = true;
    this.idEditando = pub.id;
    this.imagemPreview = `http://localhost:8000/storage/${pub.imagem}`;
    this.form.patchValue({
      titulo:            pub.titulo,
      descricao:         pub.descricao,
      botao_link:        pub.botao_link,
      titulo_botao_link: pub.titulo_botao_link,
      dt_inicio:         new Date(pub.dt_inicio),
      dt_fim:            new Date(pub.dt_fim),
      estados:           pub.estados.map((e: any) => e.id),
    });
    this.modalVisivel = true;
  }

  onImagemSelecionada(event: any): void {
    const file = event.files[0];
    this.imagemSelecionada = file;
    const reader = new FileReader();
    reader.onload = (e: any) => this.imagemPreview = e.target.result;
    reader.readAsDataURL(file);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.modoEdicao && !this.imagemSelecionada) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione uma imagem' });
      return;
    }

    const formData = new FormData();
    const valores = this.form.value;

    formData.append('titulo',            valores.titulo);
    formData.append('descricao',         valores.descricao);
    formData.append('botao_link',        valores.botao_link);
    formData.append('titulo_botao_link', valores.titulo_botao_link);
    formData.append('dt_inicio',         this.formatarData(valores.dt_inicio));
    formData.append('dt_fim',            this.formatarData(valores.dt_fim));

    valores.estados.forEach((id: number) => formData.append('estados[]', String(id)));

    if (this.imagemSelecionada) {
      formData.append('imagem', this.imagemSelecionada);
    }

    if (this.modoEdicao && this.idEditando) {
      this.publicidadeService.atualizar(this.idEditando, formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Publicidade atualizada!' });
          this.modalVisivel = false;
          this.carregarPublicidades();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar publicidade' })
      });
    } else {
      this.publicidadeService.criar(formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Publicidade criada!' });
          this.modalVisivel = false;
          this.carregarPublicidades();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar publicidade' })
      });
    }
  }

  encerrar(id: number): void {
    this.publicidadeService.encerrar(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Publicidade encerrada!' });
        this.carregarPublicidades();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao encerrar publicidade' })
    });
  }

  formatarData(data: any): string {
    if (!data) return '';
    const d = new Date(data);
    return d.toISOString().split('T')[0];
  }

  getImagemUrl(caminho: string): string {
    return `http://localhost:8000/storage/${caminho}`;
  }

  isAtiva(pub: any): boolean {
    const hoje = new Date();
    return new Date(pub.dt_inicio) <= hoje && hoje <= new Date(pub.dt_fim);
  }

  fecharModal(): void {
    this.modalVisivel = false;
  }

}