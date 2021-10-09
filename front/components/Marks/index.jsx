import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { addNewMark, editCurrentMark, deleteCurrentMark } from '../../store/actions/marks.actions'

import AddMarkComponent from '../AddMark'
import EditMarkComponent from '../EditMark'

export default connect((s) => ({
  user: s.user.state,
  marks: s.marks.state,

}), {
  addNewMark,
  editCurrentMark,
  deleteCurrentMark
})(
  ({
    CurrentLanguage_G,

    user,
    marks,

    addNewMark,
    editCurrentMark,
    deleteCurrentMark
  }) => {
    const [AddMarkOpen, changeAddMarkOpen] = useState(false)
    const [EditMarkOpen, changeEditMarkOpen] = useState(false)
    const [CurrentMark, changeCurrentMark] = useState(false)
    const [CurrentPage, changeCurrentPage] = useState(1)

    const editMark = (mark) => {
      changeCurrentMark(mark)
      changeEditMarkOpen(true)
    }

    const handlePageChange = (page) => {
      changeCurrentPage(page);
    }

    return (
      <section className="content">
        {
          AddMarkOpen
            ? <AddMarkComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              marks={marks}
              addNewMark={addNewMark}
              onOutsideClick={() => changeAddMarkOpen(false)}
            />
            : null
        }
        {
          EditMarkOpen
            ? <EditMarkComponent
              CurrentLanguage_G={CurrentLanguage_G}
              user={user}
              marks={marks}
              CurrentMark={CurrentMark}
              editCurrentMark={editCurrentMark}
              deleteCurrentMark={deleteCurrentMark}
              onOutsideClick={() => changeEditMarkOpen(false)}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].marksPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].marksPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].marksPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].marksPage.marks}</strong></h2>
                  </div>
                  <div class="body">
                    <div className="w-100 d-flex justify-content-end mb-2">
                      <button onClick={() => changeAddMarkOpen(true)} class="btn btn-outline-secondary p-2" type="button">+ {languagesTranslate[CurrentLanguage_G].marksPage.addMarkButton}</button>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].marksPage.name}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].marksPage.mark}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].marksPage.checkDomains}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].marksPage.checkPassword}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].marksPage.checkHistory}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          marks.map((v, i) =>
                            i < CurrentPage * 25 && i >= (CurrentPage - 1) * 25
                              ? <tr key={i} onDoubleClick={() => editMark(v)} className={'cursor-pointer'}>
                                <th style={{ color: v.color }} scope="row">{v.name}</th>
                                <td style={{ color: v.color }}>{v.domains}</td>
                                <td style={{ color: v.color }}>{v.checkCookie ? languagesTranslate[CurrentLanguage_G].marksPage.have : languagesTranslate[CurrentLanguage_G].marksPage.noHave}</td>
                                <td style={{ color: v.color }}>{v.checkPasswords ? languagesTranslate[CurrentLanguage_G].marksPage.have : languagesTranslate[CurrentLanguage_G].marksPage.noHave}</td>
                                <td style={{ color: v.color }}>{v.checkHistory ? languagesTranslate[CurrentLanguage_G].marksPage.have : languagesTranslate[CurrentLanguage_G].marksPage.noHave}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].marksPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].marksPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(marks.length / 25)}
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