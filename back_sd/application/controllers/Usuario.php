<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
	header('Access-Control-Allow-Headers: *');
}

class Usuario extends CI_Controller {

	public function __construct() {
		parent::__construct();

		$this->load->model("usuariomodel");
	}

	public function cadastrar()
	{
		$this->load->library('form_validation');

		$this->form_validation->set_rules('nome', 'Nome', 
			'trim|required');
		$this->form_validation->set_rules('senha', 'Senha', 
			'trim|required');
		
		$erros = "";

		if ($this->input->post("senha") != "")
			if ($this->input->post("senha") != $this->input->post("c_senha"))
			$erros = "<p>Senha e Confirmação de Senha não conferem.</p>";
			
		$p = (object)  $this->input->post();

		if ($this->form_validation->run() == FALSE or $erros != "") {
			$rps = array(
				'status' => false,
				'erros' => validation_errors().$erros
			);
		} else {
			$e = (object)[];
			$e->nome = $p->nome;
			$e->senha = $p->senha;
			$e->email = $p->email;
			$e->status = $p->status;

			if (!isset($p->id)) {
				$e->data_inc = date("Y-m-d H:i:s");

				$this->usuariomodel->cadastrar($e);

				$mensagem = "Cadastro realizado com sucesso.";
			} else {
				$e->data_alt = date("Y-m-d H:i:s");
				$id = $p->id;

				$this->usuariomodel->alterar($id, $e);

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

		$rps = $this->usuariomodel->excluir($id);

		print_r($rps);
		
		echo json_encode([
			'status' => true,
			'mensagem' => 'Exclusão realizada com sucesso.'
		]);
	}

	public function listar()
	{
		$usuario = $this->usuariomodel->listar(null);
		$rps = array(
			'status' => true,
			'obj' => $usuario
		);

		echo json_encode($rps);
	}
}
