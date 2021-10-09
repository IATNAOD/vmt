import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

import languagesTranslate from '../../common/languages'

import MultiStringSelect from '../CustomMultipleStringSelect'

export default ({
  CurrentLanguage_G,

  user,
  workers,

  addNewWorker,
  onOutsideClick
}) => {
  const [DidMount, changeDidMount] = useState(false)
  const [User, changeUser] = useState({
    username: "",
    email: "",
    password: "",
    workerNote: "",
    permissions: {
      timeout: 0,
      ID: false,
      startID: false,
      IP: false,
      allCountrys: false,
      allCountrysValue: [],
      sites: false,
      sitesValue: [],
      note: false,
      cookie: false,
      cookieValue: [],
      important: false,
      allMarks: false,
      paypal: false,

      wallets: false,
      bankCards: false,
      empty: false,
      telegram: false,
      twoFA: false,
      favorites: false,
      unique: false,
      globalDuplicates: false,
      notDownloaded: false
    }
  })

  const submitAddWorker = (e) => {
    e.preventDefault()
    addNewWorker({
      ...User,
      permissions: {
        timeout: User.permissions.timeout,
        ID: User.permissions.ID,
        startID: User.permissions.startID,
        IP: User.permissions.IP,
        allCountrys: User.permissions.allCountrysValue.map(v => v.name),
        sites: User.permissions.sitesValue,
        note: User.permissions.note,
        cookie: User.permissions.cookieValue,
        important: User.permissions.important,
        allMarks: User.permissions.allMarks,
        paypal: User.permissions.paypal,
        wallets: User.permissions.wallets,
        bankCards: User.permissions.bankCards,
        empty: User.permissions.empty,
        telegram: User.permissions.telegram,
        twoFA: User.permissions.twoFA,
        favorites: User.permissions.favorites,
        unique: User.permissions.unique,
        globalDuplicates: User.permissions.globalDuplicates,
        notDownloaded: User.permissions.notDownloaded
      },
      token: user.token
    })
  }

  useEffect(() => {
    changeDidMount(true)
  }, [])

  useEffect(() => {

    if (DidMount)
      onOutsideClick()

  }, [workers])

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.addWorker}</h4>
          </div>
          <div class="modal-body">
            <form onSubmit={submitAddWorker}>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.username}</span>
                </div>
                <input type="text" required value={User.username} onChange={e => changeUser({ ...User, username: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.email}</span>
                </div>
                <input type="email" required value={User.email} onChange={e => changeUser({ ...User, email: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.password}</span>
                </div>
                <input type="text" required value={User.password} onChange={e => changeUser({ ...User, password: e.target.value })} class="form-control d-inline-block m-0" />
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.note}</span>
                </div>
                <input type="text" value={User.workerNote} onChange={e => changeUser({ ...User, workerNote: e.target.value })} class="form-control d-inline-block m-0" />
              </div>


              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <span class="input-group-text" >{languagesTranslate[CurrentLanguage_G].addWorkerComponent.timeout}</span>
                </div>
                <input type="text" value={User.permissions.timeout} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, timeout: parseInt(e.target.value) | 0 } })} class="form-control d-inline-block m-0" />
              </div>

              <div class="row clearfix mt-2">
                <div className="col-12">
                  <strong>{languagesTranslate[CurrentLanguage_G].addWorkerComponent.searchSettings}</strong>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="ID" type="checkbox" checked={User.permissions.ID} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, ID: e.target.checked } })} />
                    <label htmlFor="ID">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.ID}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="startID" type="checkbox" checked={User.permissions.startID} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, startID: e.target.checked } })} />
                    <label htmlFor="startID">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.startID}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="IP" type="checkbox" checked={User.permissions.IP} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, IP: e.target.checked } })} />
                    <label htmlFor="IP">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.IP}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="allCountry" type="checkbox" checked={User.permissions.allCountrys} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, allCountrys: e.target.checked } })} />
                    <label htmlFor="allCountry">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.allCountrys}</label>
                  </div>

                  {
                    User.permissions.allCountrys
                      ? <div className="mb-3">
                        <Multiselect
                          options={[
                            { name: 'US', id: 1 },
                            { name: 'RU', id: 2 },
                            { name: 'KZ', id: 3 },
                          ]}
                          selectedValues={User.permissions.allCountrysValue}
                          onRemove={(list) => changeUser({ ...User, permissions: { ...User.permissions, allCountrysValue: list } })}
                          onSelect={(list) => changeUser({ ...User, permissions: { ...User.permissions, allCountrysValue: list } })}
                          displayValue="name"
                        />
                      </div>
                      : null
                  }

                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="sites" type="checkbox" checked={User.permissions.sites} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, sites: e.target.checked } })} />
                    <label htmlFor="sites">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.sites}</label>
                  </div>

                  {
                    User.permissions.sites
                      ? <div className="mb-3">
                        <MultiStringSelect
                          values={User.permissions.sitesValue}
                          onChange={(v) => changeUser({ ...User, permissions: { ...User.permissions, sitesValue: [...User.permissions.sitesValue, v] } })}
                          onDelete={v => changeUser({ ...User, permissions: { ...User.permissions, sitesValue: User.permissions.sitesValue.filter(s => s != v) } })}
                        />
                      </div>
                      : null
                  }

                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="note" type="checkbox" checked={User.permissions.note} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, note: e.target.checked } })} />
                    <label htmlFor="note">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.note}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="cookie" type="checkbox" checked={User.permissions.cookie} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, cookie: e.target.checked } })} />
                    <label htmlFor="cookie">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.cookie}</label>
                  </div>

                  {
                    User.permissions.cookie
                      ? <div className="mb-3">
                        <MultiStringSelect
                          values={User.permissions.cookieValue}
                          onChange={(v) => changeUser({ ...User, permissions: { ...User.permissions, cookieValue: [...User.permissions.cookieValue, v] } })}
                          onDelete={v => changeUser({ ...User, permissions: { ...User.permissions, cookieValue: User.permissions.cookieValue.filter(s => s != v) } })}
                        />
                      </div>
                      : null
                  }

                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="important" type="checkbox" checked={User.permissions.important} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, important: e.target.checked } })} />
                    <label htmlFor="important">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.important}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="allNote" type="checkbox" checked={User.permissions.allMarks} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, allMarks: e.target.checked } })} />
                    <label htmlFor="allNote">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.allMark}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="paypal" type="checkbox" checked={User.permissions.paypal} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, paypal: e.target.checked } })} />
                    <label htmlFor="paypal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.paypal}</label>
                  </div>
                </div>

              </div>

              <div class="row clearfix mt-2">
                <div className="col-12">
                  <strong>{languagesTranslate[CurrentLanguage_G].addWorkerComponent.filterSettings}</strong>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="wallets" type="checkbox" checked={User.permissions.wallets} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, wallets: e.target.checked } })} />
                    <label htmlFor="wallets">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.wallets}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="bankCards" type="checkbox" checked={User.permissions.bankCards} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, bankCards: e.target.checked } })} />
                    <label htmlFor="bankCards">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.bankCards}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="empty" type="checkbox" checked={User.permissions.empty} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, empty: e.target.checked } })} />
                    <label htmlFor="empty">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.empty}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="telegram" type="checkbox" checked={User.permissions.telegram} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, telegram: e.target.checked } })} />
                    <label htmlFor="telegram">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.telegram}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="2fa" type="checkbox" checked={User.permissions.twoFA} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, twoFA: e.target.checked } })} />
                    <label htmlFor="2fa">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.teoFAplugins}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="favorites" type="checkbox" checked={User.permissions.favorites} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, favorites: e.target.checked } })} />
                    <label htmlFor="favorites">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.favorites}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="unique" type="checkbox" checked={User.permissions.unique} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, unique: e.target.checked } })} />
                    <label htmlFor="unique">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.unique}</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <input id="globalduplicates" type="checkbox" checked={User.permissions.globalDuplicates} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, globalDuplicates: e.target.checked } })} />
                    <label htmlFor="globalduplicates">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.globalDuplicates}</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="checkbox">
                    <input id="notDownloaded" type="checkbox" checked={User.permissions.notDownloaded} onChange={e => changeUser({ ...User, permissions: { ...User.permissions, notDownloaded: e.target.checked } })} />
                    <label htmlFor="notDownloaded">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.notDownloaded}</label>
                  </div>
                </div>

              </div>

              <div className="w-100 d-flex justify-content-center">
                <button type={'submit'} class="btn btn-success m-0">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.addWorkerButton}</button>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
