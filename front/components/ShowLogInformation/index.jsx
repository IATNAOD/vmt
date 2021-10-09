import React from 'react';

import languagesTranslate from '../../common/languages'

export default ({
  CurrentLanguage_G,
  information,
  onOutsideClick
}) => {
  return (

    <div onClick={e => e.target.id == 'defaultModal' ? onOutsideClick() : null} class={"modal fade  overflow-auto show"} id="defaultModal" tabindex="-1" role="dialog" style={{ display: 'inline-block' }}>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="title" id="defaultModalLabel">{languagesTranslate[CurrentLanguage_G].showLogInformation.information}</h4>
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.closeButton}</button>
          </div>
          <div class="modal-body">
            <span dangerouslySetInnerHTML={{ __html: information.split('\n').join('<br/>') }} />
          </div>
          <div class="modal-footer">
            <button onClick={onOutsideClick} type="button" class="btn btn-danger waves-effect" data-dismiss="modal">{languagesTranslate[CurrentLanguage_G].addWorkerComponent.closeButton}</button>
          </div>
        </div>
      </div>
    </div>

  )

}
