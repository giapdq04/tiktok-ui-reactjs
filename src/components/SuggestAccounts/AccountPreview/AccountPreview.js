import classNames from 'classnames/bind'
import style from './AccountPreview.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(style)

const AccountPreview = () => {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <img className={cx('avatar')} src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/4e7908911a417da43430a4feb6a64f61.jpeg?lk3s=a5d48078&nonce=70980&refresh_token=efc4adb4d4099dea429e280a714ffa37&x-expires=1737946800&x-signature=R3akEHEGn9Tm%2FveGSn3SjySj5cE%3D&shp=a5d48078&shcp=b59d6b55' alt='' />
        <Button className={cx('follow-btn')} primary>Follow</Button>
      </header>

      <div className={cx('body')}>
        <p className={cx('nickname')}>
          <strong>quocanh</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Quoocs nguyen phu</p>

        <p className={cx('analytics')}>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>Followers</span>
          <strong className={cx('value')}>8.2M </strong>
          <span className={cx('label')}>Likes</span>

        </p>
      </div>
    </div>
  )
}

export default AccountPreview