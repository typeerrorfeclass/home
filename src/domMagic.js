import $ from 'jquery'
import Hammer from 'hammerjs'

export default function domMagic () {
  enableLargeListItem()

  if (isMobile() || window.location.href.includes('swipe')) {
    enableSwipeToNext()
  }
}

function enableLargeListItem () {
    // 点击列表条目变大
  $('.ppt').delegate('li', 'click', function () {
    const $el = $(this)
    const highlightClass = 'hightlight-list-item'

    if ($el.hasClass(highlightClass)) {
      $el.removeClass(highlightClass)
      return
    }

    $(`.${highlightClass}`).removeClass(highlightClass)

    $el.addClass('transition')
    $el.addClass(highlightClass)
  })

      // 点击其他元素列表条目恢复
  $('.ppt').delegate('.page', 'click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'li') {
      return
    }

    $('.hightlight-list-item').removeClass('hightlight-list-item')
  })
}

function isMobile () {
  const ua = window.navigator.userAgent.toLowerCase()

  if (/android/i.test(ua)) {
    return true
  }

  if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
    return true
  }
  if (/linux/i.test(ua)) {
    return true
  }
  if (/micromessenger/i.test(ua)) {
    return true
  }
}

function enableSwipeToNext () {
  const pages = document.querySelector('.ppt')
  const h = new Hammer(pages)

  h.on('swiperight', _ => {
    goPrev()
  })

  h.on('swipeleft', _ => {
    goNext()
  })
}

function goNext () {
  let currIndex = parseInt(window.location.hash.replace('#/', ''))
  if (isNaN(currIndex)) {
    currIndex = -1
  }

  goto(`/${currIndex + 1}`)
}

function goPrev () {
  let currIndex = parseInt(window.location.hash.replace('#/', ''))
  if (isNaN(currIndex)) {
    currIndex = 1
  }

  if (currIndex === 0) {
    return
  }

  goto(`/${currIndex - 1}`)
}

function goto (hash) {
  const pages = $('.ppt .pages')
  pages.addClass('transition')

  pages.css({ opacity: 0 })

  setTimeout(_ => {
    window.location.hash = hash
    pages.css({ opacity: 1 })
  }, 200)
}
