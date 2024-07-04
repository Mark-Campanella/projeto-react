<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
	header('Access-Control-Allow-Headers: *');
}

class Fabricante extends CI_Controller {

	public function __construct() {
		parent::__construct();

		$this->load->model("fabricantemodel");
	}

	public function cadastrar()
	{
		$this->load->library('form_validation');

		$this->form_validation->set_rules('nome', 'Nome', 
			'trim|required');
		$this->form_validation->set_rules('endereco', 'Endereco', 
			'trim|required');
		$this->form_validation->set_rules('cidade', 'Cidade', 
			'trim|required');
		$this->form_validation->set_rules('bairro', 'Bairro', 
			'trim|required');
		$this->form_validation->set_rules('estado', 'Estado', 
			'trim|required');
					
		$erros = "";

		$p = (object)  $this->input->post();

		if ($this->form_validation->run() == FALSE or $erros != "") {
			$rps = array(
				'status' => false,
				'erros' => validation_errors().$erros
			);
		} else {
			$e = (object)[];
			$e->nome = $p->nome;
			$e->endereco = $p->endereco;
			$e->cidade = $p->cidade;
			$e->bairro = $p->bairro;
			$e->estado = $p->estado;
			$e->status = $p->status;

			if (!isset($p->id)) {
				$e->data_inc = date("Y-m-d H:i:s");

				$this->fabricantemodel->cadastrar($e);

				$mensagem = "Cadastro realizado com sucesso.";
			} else {
				$e->data_alt = date("Y-m-d H:i:s");
				$id = $p->id;

				$this->fabricantemodel->alterar($id, $e);

				$mensagem = "Alteração realizado com sucesso.";
			}		

			$rps = array(
				'status' => true,
				'mensagem' => $mensagem
			);
		}
		echo json_encode($rps);
	}

	public function excluir() 
	{
		$id = $this->input->post('id');

		$rps = $this->fabricantemodel->excluir($id);

		print_r($rps);
		
		echo json_encode([
			'status' => true,
			'mensagem' => 'Exclusão realizada com sucesso.'
		]);
	}

	public function listar()
	{
		$fabricante = $this->fabricantemodel->listar(null);
		$rps = array(
			'status' => true,
			'obj' => $fabricante
		);

		echo json_encode($rps);
	}
}
