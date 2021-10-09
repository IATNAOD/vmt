import React from 'react';
import { baseUrl } from '../../common/config';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,
  screenshot,
  onOutsideClick
}) => {

  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <img src={`${baseUrl}${screenshot}`} alt="" className={'w-100'} />
          </div>
          <div class="modal-footer">
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
