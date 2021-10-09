import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { addNewGrabber, editCurrentGrabber, deleteCurrentGrabber } from '../../store/actions/grabbers.actions'

import AddGrabberComponent from '../AddGrabber'
import EditGrabberComponent from '../EditGrabber'

export default connect((s) => ({
  user: s.user.state,
  grabbers: s.grabber.state,

}), {
  addNewGrabber,
  editCurrentGrabber,
  deleteCurrentGrabber
})(
  ({
    CurrentLanguage_G,

    user,
    grabbers,

    addNewGrabber,
    editCurrentGrabber,
    deleteCurrentGrabber
  }) => {
    const [addGrabberOpen, changeAddGrabberOpen] = useState(false)
    const [EditGrabberOpen, changeEditGrabberOpen] = useState(false)
    const [CurrentGrabber, changeCurrentGrabber] = useState(false)
    const [CurrentPage, changeCurrentPage] = useState(1)

    const editGrabber = (grabber) => {
      changeCurrentGrabber(grabber)
      changeEditGrabberOpen(true)
    }

    const handlePageChange = (page) => {
      changeCurrentPage(page);
    }

    return (
      <section className="content">
        {
          addGrabberOpen
            ? <AddGrabberComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              grabbers={grabbers}
              addNewGrabber={addNewGrabber}
              onOutsideClick={() => changeAddGrabberOpen(false)}
            />
            : null
        }
        {
          EditGrabberOpen
            ? <EditGrabberComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              grabbers={grabbers}
              CurrentGrabber={CurrentGrabber}
              editCurrentGrabber={editCurrentGrabber}
              deleteCurrentGrabber={deleteCurrentGrabber}
              onOutsideClick={() => changeEditGrabberOpen(false)}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].grabberPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].grabberPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].grabberPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].grabberPage.grabber}</strong></h2>
                  </div>
                  <div class="body">
                    <div className="w-100 d-flex justify-content-end mb-2">
                      <button onClick={() => changeAddGrabberOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].grabberPage.addGrabberButton}</button>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].grabberPage.name}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].grabberPage.folder}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].grabberPage.files}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].grabberPage.exceptions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          grabbers.map((v, i) =>
                            i < CurrentPage * 25 && i >= (CurrentPage - 1) * 25
                              ? <tr key={i} onDoubleClick={() => editGrabber(v)} className={'cursor-pointer'}>
                                <th scope="row">{v.name}</th>
                                <td>{v.folder}</td>
                                <td>{v.files.split('\n').join(', ')}</td>
                                <td>{v.exceptions}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].grabberPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].grabberPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(grabbers.length / 25)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) => handlePageChange(page.selected + 1)}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      pageLinkClassName={'num'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    )

  }
);