import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag"

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,
  logId,
  logCountry,
  logIp,
  sites,
  onOutsideClick
}) => {
  const [Search, changeSearch] = useState('');

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button onClick={onOutsideClick} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
            <h4 class="title" id="defaultModalLabel">#{logId} - <ReactCountryFlag countryCode={logCountry} svg cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/" cdnSuffix="svg" />{logIp}</h4>
          </div>
          <div class="modal-body">
            <div className="w-100 row">
              <div className="col-6" />
              <div className="col-6">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].showLogSites.search} value={Search} onChange={e => changeSearch(e.target.value)} />
                </div>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>{languagesTranslate[CurrentLanguage_G].showLogSites.site}</th>
                </tr>
              </thead>
              <tbody>
                {
                  sites.filter(v => v.indexOf(Search) != -1).map((v, i) =>
                    <tr key={i}>
                      <th scope="row">
                        {v}
                      </th>
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
