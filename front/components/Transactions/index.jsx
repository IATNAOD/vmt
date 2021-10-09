import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { parseFullTime } from '../../common/utils';

import { getOwnTransactions } from '../../store/actions/transactions.actions'

export default connect((s) => ({
  user: s.user.state,
  transactions: s.transactions.state,
  transactionsCount: s.transactions.all,
}), {
  getOwnTransactions
})(
  ({
    CurrentLanguage_G,

    user,
    transactions,
    transactionsCount,

    getOwnTransactions,
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (transactions.length != transactionsCount && CurrentPage == (transactions.length / 25) - 1)
        getOwnTransactions({
          token: user.token,
          from: transactions.length
        })

    }

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].transactionsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].transactionsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].transactionsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].transactionsPage.history}</strong></h2>
                  </div>
                  <div class="body">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].transactionsPage.ID}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].transactionsPage.amount}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].transactionsPage.action}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].transactionsPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          transactions.map((v, i) =>
                            i < CurrentPage * 25 && i >= (CurrentPage - 1) * 25
                              ? <tr key={i}>
                                <th scope="row">{v._id}</th>
                                <td className={v.type == 'INCOME' ? 'text-success' : 'text-danger'}>{v.type == 'INCOME' ? '+' : '-'}{v.value}</td>
                                <td>{v.description[CurrentLanguage_G]}</td>
                                <td>{parseFullTime(v.createdAt)}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].transactionsPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].transactionsPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(transactionsCount / 25)}
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
      </section >
    )

  }
);