import React, { useEffect, useState } from 'react';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,

  user,
  loaders,

  CurrentLoader,

  editCurrentLoader,
  deleteCurrentLoader,
  onOutsideClick
}) => {
  const [DidMount, changeDidMount] = useState(false)
  const [Loader, changeLoader] = useState({
    name: '',
    url: '',
    country: '',
    mark: '',
  })

  const submitEditLoader = (e) => {
    e.preventDefault()
    editCurrentLoader({
      ...Loader,
      token: user.token
    })
  }

  useEffect(() => {
    changeDidMount(true)
  }, [])

  useEffect(() => {
    if (CurrentLoader)
      changeLoader({ ...CurrentLoader })
  }, [CurrentLoader])

  useEffect(() => {

    if (DidMount)
      onOutsideClick()

  }, [loaders])

  return (
    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.editLoader}</h4>
          </div>
          <div class="modal-body">
            <form onSubmit={submitEditLoader}>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.name}</span>
                </div>
                <input type="text" required value={Loader.name} onChange={e => changeLoader({ ...Loader, name: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.url}</span>
                </div>
                <input type="text" required value={Loader.url} onChange={e => changeLoader({ ...Loader, url: e.target.value })} class="form-control d-inline-block m-0" />
                <div class="input-group-append">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.exe}</span>
                </div>
              </div>

              <span className="text-warning">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.warning}</span>

              <div className="row">
                <div className="col-6">
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <span className={'input-group-text'}>
                        <i class="zmdi zmdi-google-earth"></i>
                      </span>
                    </div>
                    <input type="text" required value={Loader.country} onChange={e => changeLoader({ ...Loader, country: e.target.value })} class="form-control d-inline-block m-0" />
                  </div>
                </div>
                <div className="col-6">
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <span className={'input-group-text'}>
                        <i class="zmdi zmdi-tag"></i>
                      </span>
                    </div>
                    <input type="text" required value={Loader.mark} onChange={e => changeLoader({ ...Loader, mark: e.target.value })} class="form-control d-inline-block m-0" />
                  </div>
                </div>
              </div>

              <div className="w-100 d-flex justify-content-center">
                <button type={'submit'} class="btn btn-success m-0">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.editLoaderButton}</button>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button onClick={() => deleteCurrentLoader({ _id: Loader._id, token: user.token })} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.deleteLoaderButton}</button>
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].editLoaderComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}