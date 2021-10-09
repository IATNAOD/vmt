import React, { useEffect, useState } from 'react';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,

  user,
  marks,

  CurrentMark,

  editCurrentMark,
  deleteCurrentMark,
  onOutsideClick
}) => {
  const [DidMount, changeDidMount] = useState(false)
  const [Mark, changeMark] = useState({
    name: '',
    domains: '',
    color: 'green',
    checkCookie: false,
    checkPasswords: false,
    checkHistory: false
  })

  const submitEditMark = (e) => {
    e.preventDefault()
    editCurrentMark({
      ...Mark,
      token: user.token
    })
  }

  useEffect(() => {
    if (CurrentMark)
      changeMark({ ...CurrentMark })
  }, [CurrentMark])

  useEffect(() => {
    changeDidMount(true)
  }, [])

  useEffect(() => {

    if (DidMount)
      onOutsideClick()

  }, [marks])

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].editMarkComponent.editMark}</h4>
          </div>
          <div class="modal-body">
            <form onSubmit={submitEditMark}>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].editMarkComponent.name}</span>
                </div>
                <input type="text" required value={Mark.name} onChange={e => changeMark({ ...Mark, name: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <textarea rows="4" class="form-control no-resize" placeholder={languagesTranslate[CurrentLanguage_G].editMarkComponent.domains} value={Mark.domains} onChange={e => changeMark({ ...Mark, domains: e.target.value })} required></textarea>
              </div>
              <span className="text-warning">{languagesTranslate[CurrentLanguage_G].editMarkComponent.devideMarks}</span>

              <div class="row clearfix mt-2 mb-2">

                <div className="col-lg-7 col-md-12 d-flex align-items-center mt-2">
                  <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].editMarkComponent.color}</span>
                </div>
                <div className="col-lg-5 col-md-0 d-flex justify-content-start align-items-center ">
                  <div onClick={() => changeMark({ ...Mark, color: 'green' })} className={Mark.color == 'green' ? "mark-color active" : "mark-color"} style={{ background: 'green' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'purple' })} className={Mark.color == 'purple' ? "mark-color active" : "mark-color"} style={{ background: 'purple' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'orange' })} className={Mark.color == 'orange' ? "mark-color active" : "mark-color"} style={{ background: 'orange' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'yellow' })} className={Mark.color == 'yellow' ? "mark-color active" : "mark-color"} style={{ background: 'yellow' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'blue' })} className={Mark.color == 'blue' ? "mark-color active" : "mark-color"} style={{ background: 'blue' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'cyan' })} className={Mark.color == 'cyan' ? "mark-color active" : "mark-color"} style={{ background: 'cyan' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'red' })} className={Mark.color == 'red' ? "mark-color active" : "mark-color"} style={{ background: 'red' }} />
                  <div onClick={() => changeMark({ ...Mark, color: 'pink' })} className={Mark.color == 'pink' ? "mark-color active" : "mark-color"} style={{ background: 'pink' }} />
                </div>

                <div className="col-lg-7 col-md-12 d-flex align-items-center mt-2">
                  <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].editMarkComponent.checkDomains}</span>
                </div>
                <div className="col-lg-5 col-md-0 d-flex justify-content-start">
                  <label class="switch m-0">
                    <input type="checkbox" class="primary" checked={Mark.checkCookie} onChange={e => changeMark({ ...Mark, checkCookie: e.target.checked })} />
                    <span class="slider round"></span>
                  </label>
                </div>

                <div className="col-lg-7 col-md-12 d-flex align-items-center mt-2">
                  <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].editMarkComponent.checkPassword}</span>
                </div>
                <div className="col-lg-5 col-md-0 d-flex justify-content-start">
                  <label class="switch m-0">
                    <input type="checkbox" class="primary" checked={Mark.checkPasswords} onChange={e => changeMark({ ...Mark, checkPasswords: e.target.checked })} />
                    <span class="slider round"></span>
                  </label>
                </div>

                <div className="col-lg-7 col-md-12 d-flex align-items-center mt-2">
                  <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].editMarkComponent.checkHistory}</span>
                </div>
                <div className="col-lg-5 col-md-0 d-flex justify-content-start">
                  <label class="switch m-0">
                    <input type="checkbox" class="primary" checked={Mark.checkHistory} onChange={e => changeMark({ ...Mark, checkHistory: e.target.checked })} />
                    <span class="slider round"></span>
                  </label>
                </div>

              </div>

              <div className="w-100 d-flex justify-content-center">
                <button type={'submit'} class="btn btn-success m-0">{languagesTranslate[CurrentLanguage_G].editMarkComponent.editMarkButton}</button>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button onClick={() => deleteCurrentMark({ _id: Mark._id, token: user.token })} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].editMarkComponent.deleteMarkButton}</button>
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].editMarkComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
