import { withRouter } from 'react-router';
import Api from '../../services';
import React, { useState, useEffect } from 'react';
//import DataTable from 'react-data-table-component';
import LoadingOverlay from 'react-loading-overlay';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useToasts } from 'react-toast-notifications';
import DataTable from 'react-data-table-component';

const Categoria = () => {
    const { addToast } = useToasts();
    const [ categorias, setCategorias ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ formCategoria, setFormCategoria ] = useState({});

    useEffect(() => {
        getListar();
    }, []);

    function adicionar() {
        setFormCategoria({});
        setModal(true);
    }

    function editar(categoria) {
        var linha = JSON.parse(JSON.stringify(categoria));

        setFormCategoria(linha);
        setModal(true);
    }

    function excluir(categoria) {
        var linha = JSON.parse(JSON.stringify(categoria));

        Swal.fire({
            icon: 'question',
            title: 'Confirmação',
            html: 'Deseja excluir o registro?',
            showCancelButton: true,
            confirmButtonText: 'Sim, confirmar!',
            cancelButtonText: 'Não, Cancelar.'
        }).then((result) => {
            if (result.isConfirmed) {
                Api.post('categoria/excluir', linha).then (
                    rps => {
                        if (rps.data.status == true) {
                            addToast(rps.data.mensagem, {
                                appearance: "success",
                                autoDismiss: true,
                                autoDismissTimeout: 2000
                            });
                            getListar();
                        }
                    })
            }
        })
    }

    function fecharModal() {
        setModal(false);
    }

    function salvar() {
        Api.post('categoria/cadastrar', formCategoria).then(rps => {
            if (rps.data.status === true) {
                addToast(rps.data.mensagem, {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 2000
                });
                setModal(false);
                getListar();
            } else {
                Swal.fire({
                    title: "Erro!",
                    icon: "error",
                    html: rps.data.erros,
                    showCloseButton:true,
                    showCancelButton: false,
                })
            }

        })
    }

    function getListar() {
        Api.get('categoria/listar').then(rps => {
            setCategorias(rps.data.obj);
        })
    }

    const data = categorias;
    const columns = [
        {
            name: <th>Código</th>,
            selector: 'id',
            sortable: true,
            width: '8%',
            center: true,
        },
        {
            name: <th>Nome</th>,
            selector: 'nome',
            sortable: true,
            width: '40%',
        },
        {
            name: <th>Status</th>,
            selector: 'status',
            sortable: true,
            width: '10%',
        },
        {
            name: <th>Data Inclusão</th>,
            selector: 'data_inc',
            sortable: true,
            width: '13%',
            center: true,
        },
        {
            name: <th>Data Alteração</th>,
            selector: 'data_alt',
            sortable: true,
            width: '13%',
            center: true,
        },
        {
            name: <th>Ações</th>,
            cell: (row) => {
                return (
                    <>
                    <button className="btn btn-warning btn-sm" onClick={e => {editar(row)}}>Alterar</button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={e => {excluir(row)}}>Excluir</button>
                    </>
                )
            }
        }
    ]

    return (
        <>
        <div className='container'>

           <div className='row'>
                <div className='col-md-12 text-right'>
                    <button className='btn btn-success'
                        onClick={e => {adicionar()}}>Cadastrar</button>       
                </div>
           </div>

           <DataTable
            title="Lista de Categorias"
            columns={columns}
            data={data}
            striped="true"
            pagination="true"
            />

        </div>

           <Modal size={'xl'} show={modal} onHide={() => fecharModal()}>
                <Modal.Header>
                    <Modal.Title>Categoria</Modal.Title>
                    <button type='button' className='close'
                        data-mismiss='modal' aria-label='Close'
                        onClick={e => { fecharModal() }}>
                        <i aria-hidden="true" className='ki ki-close' />
                    </button>
                </Modal.Header>
                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Nome</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormCategoria({...formCategoria, nome: e.target.value})}}
                                value={formCategoria?.nome} />
                        </div>
                        <div className='form-group col-md-2'>
                            <label>Status</label>
                            <select className='form-control'
                                onChange={e => {setFormCategoria({...formCategoria, 
                                    status: e.target.value})}}
                                    value={formCategoria?.status} >
                                <option value="" selected>Selecione</option>
                                <option value="S">Ativo</option>
                                <option value="N">Desativado</option>
                            </select>
                        </div>
                    </div>
                                    
                <Modal.Footer>
                    <button type='button' onClick={e => {fecharModal();}}
                        className='btn btn-secondary'
                        data-dismiss="modal">Fechar</button>
                    <button type='button' onClick={e => {salvar();}}
                        className='btn btn-primary'>Salvar</button>                        
                </Modal.Footer>
           </Modal>
        </>
    )
}

export default withRouter(Categoria);