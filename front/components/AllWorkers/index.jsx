import React, { useState } from 'react';
import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { parseFullTime } from '../../common/utils';

import AddWorkerComponent from './../AddWorker'
import EditWorkerComponent from './../EditWorker'

import { addNewWorker, editCurrentWorker, deleteCurrentWorker } from '../../store/actions/workers.actions'

export default connect((s) => ({
  user: s.user.state,
  workers: s.workers.state
}), {
  addNewWorker,
  editCurrentWorker,
  deleteCurrentWorker
})(
  ({
    CurrentLanguage_G,

    user,
    workers,

    addNewWorker,
    editCurrentWorker,
    deleteCurrentWorker
  }) => {
    const [CreateWorkerOpen, changeCreateWorkerOpen] = useState(false)
    const [EditWorkerOpen, changeEditWorkerOpen] = useState(false)
    const [CurrentWorker, changeCurrentWorker] = useState(false)

    const editWorker = (worker) => {
      changeCurrentWorker(worker)
      changeEditWorkerOpen(true)
    }

    return (
      <section className="content">
        {
          CreateWorkerOpen
            ? <AddWorkerComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              workers={workers}
              addNewWorker={addNewWorker}
              onOutsideClick={() => changeCreateWorkerOpen(false)}
            />
            : null
        }
        {
          EditWorkerOpen
            ? <EditWorkerComponent
              CurrentLanguage_G={CurrentLanguage_G}
              CurrentWorker={CurrentWorker}
              user={user}
              workers={workers}
              editCurrentWorker={editCurrentWorker}
              deleteCurrentWorker={deleteCurrentWorker}
              onOutsideClick={() => changeEditWorkerOpen(false)}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allWorkersPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allWorkersPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allWorkersPage.pathItem2}</li>
                </ul>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i
                  className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row clearfix">
              <div class="col-lg-12 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allWorkersPage.workers}</strong></h2>
                  </div>
                  <div class="body">
                    <div className="w-100 d-flex justify-content-end mb-2">
                      <button onClick={() => changeCreateWorkerOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].allWorkersPage.addWorker}</button>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].allWorkersPage.login}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWorkersPage.ipHistory}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWorkersPage.note}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWorkersPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          workers.map((v, i) =>
                            <tr key={i} onDoubleClick={() => editWorker(v)} className={'cursor-pointer'}>
                              <th scope="row">{v.username}</th>
                              <td>{v.ips.length > 0 ? v.ips.map((v, i) => <div className="w-100 mb-1" key={i}>{v}</div>) : 'Отсутствует'}</td>
                              <td>{v.workerNote}</td>
                              <td>{parseFullTime(v.createdAt)}</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >
    )

  }
);