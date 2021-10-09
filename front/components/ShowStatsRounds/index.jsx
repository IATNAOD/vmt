import React, { useState, useEffect } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import languagesTranslate from '../../common/languages'

import { parseDate } from '../../common/utils';
import { cpUrl } from '../../common/config';

export default ({
  CurrentLanguage_G,
  rounds,
  deleteRound,
  updateRound,
  togglePublic,
  onOutsideClick
}) => {
  const [Rounds, changeRounds] = useState(rounds);

  useEffect(() => {
    changeRounds(rounds)
  }, [rounds])

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lgt" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button onClick={onOutsideClick} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].showRoundsComponent.rounds}</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>{languagesTranslate[CurrentLanguage_G].showRoundsComponent.name}</th>
                  <th>{languagesTranslate[CurrentLanguage_G].showRoundsComponent.date}</th>
                  <th>{languagesTranslate[CurrentLanguage_G].showRoundsComponent.public}</th>
                </tr>
              </thead>
              <tbody>
                {
                  Rounds.map((v, i) =>
                    <tr key={i}>
                      <th scope="row">
                        <button class="btn btn-danger mr-2" onClick={() => deleteRound(v._id)}>
                          <span class="btn-label">
                            <i class="zmdi zmdi-delete"></i>
                          </span>
                        </button>
                        {v.name}
                      </th>
                      <th>
                        <DateRangePicker
                          initialSettings={{ startDate: v.dateFrom ? new Date(v.dateFrom) : new Date(), endDate: v.dateTo ? new Date(v.dateTo) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeRounds(Rounds.map(rv => rv._id == v._id ? ({ ...rv, dateFrom: startDate, dateTo: endDate }) : rv))
                          }}
                        >
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                            </div>
                            <input type="text" class="form-control" readOnly value={parseDate(v.dateFrom)} />
                            <input type="text" class="form-control" readOnly value={parseDate(v.dateTo)} />
                            <div class="input-group-append">
                              <button class="btn btn-danger mb-0 mt-0" onClick={() => updateRound(v._id, v.dateFrom, v.dateTo)}>
                                <span class="btn-label">
                                  <i class="zmdi zmdi-cloud-upload"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </DateRangePicker>
                      </th>
                      <th className={'text-center'}>
                        <span className={'d-inline-flex'}>
                          <button onClick={() => togglePublic(v._id)} class="btn btn-primary w-100">{!v.public ? languagesTranslate[CurrentLanguage_G].showRoundsComponent.on : languagesTranslate[CurrentLanguage_G].showRoundsComponent.off}</button>
                          {
                            v.public
                              ? <button class="btn btn-danger mr-2" onClick={() => navigator.clipboard.writeText(`${cpUrl}shared-stats?token=${v.token}`)}>
                                <span class="btn-label">
                                  <i class="zmdi zmdi-copy"></i>
                                </span>
                              </button>
                              : null
                          }
                        </span>
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
