import React, { useEffect, useState } from 'react';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,

  user,
  grabbers,

  addNewGrabber,
  onOutsideClick
}) => {
  const [DidMount, changeDidMount] = useState(false)
  const [Grabber, changeGrabber] = useState({
    name: '',
    folder: '',
    files: '',
    maxSize: 0,
    recursive: false,
    exceptions: ''
  })

  const submitAddGrabber = (e) => {
    e.preventDefault()
    addNewGrabber({
      ...Grabber,
      token: user.token
    })
  }

  useEffect(() => {
    changeDidMount(true)
  }, [])

  useEffect(() => {

    if (DidMount)
      onOutsideClick()

  }, [grabbers])

  return (
    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.addGrabber}</h4>
          </div>
          <div class="modal-body">
            <form onSubmit={submitAddGrabber}>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.name}</span>
                </div>
                <input type="text" required value={Grabber.name} onChange={e => changeGrabber({ ...Grabber, name: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.folder}</span>
                </div>
                <input type="text" required value={Grabber.folder} onChange={e => changeGrabber({ ...Grabber, folder: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div className="w-100">
                <span onClick={() => changeGrabber({ ...Grabber, folder: '%DESTOP%/' })} class="cursor-pointer badge badge-default mb-0 mr-2">%DESTOP%/</span>
                <span onClick={() => changeGrabber({ ...Grabber, folder: '%DOCUMENTS%/' })} class="cursor-pointer badge badge-default mb-0 mr-2">%DOCUMENTS%/</span>
                <span onClick={() => changeGrabber({ ...Grabber, folder: '%USERPROFILE%/' })} class="cursor-pointer badge badge-default mb-0 mr-2">%USERPROFILE%/</span>
                <span onClick={() => changeGrabber({ ...Grabber, folder: '%APPDATA%/' })} class="cursor-pointer badge badge-default mb-0 mr-2">%APPDATA%/</span>
                <span onClick={() => changeGrabber({ ...Grabber, folder: '%LOCALAPPDATA%/' })} class="cursor-pointer badge badge-default mb-0">%LOCALAPPDATA%/</span>
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.files}</span>
                </div>
                <textarea rows="7" class="form-control no-resize" value={Grabber.files} onChange={e => changeGrabber({ ...Grabber, files: e.target.value })} required></textarea>
              </div>
              <span className="text-warning">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.divide1}</span>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.maxSize}</span>
                </div>
                <input type="text" required value={Grabber.maxSize} onChange={e => changeGrabber({ ...Grabber, maxSize: parseInt(e.target.value) | 0 })} class="form-control d-inline-block m-0" />
                <div class="input-group-append">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.size}</span>
                </div>
              </div>

              <div className="w-100 d-flex justify-content-start mb-2">
                <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].addGrabberComponent.recursive}</span>
                <label class="switch m-0">
                  <input type="checkbox" class="primary" checked={Grabber.recursive} onChange={e => changeGrabber({ ...Grabber, recursive: e.target.checked })} />
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.exceptions}</span>
                </div>
                <input type="text" value={Grabber.exceptions} onChange={e => changeGrabber({ ...Grabber, exceptions: e.target.value })} class="form-control d-inline-block m-0" />
              </div>
              <span className="text-warning">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.divide2}</span>

              <div className="w-100 d-flex justify-content-center">
                <button type={'submit'} class="btn btn-success m-0">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.addGrabberButton}</button>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addGrabberComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
