import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import TicketIcon from "../../../../public/icons/TicketIcon.svg";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  venueName?: string;
  startDate?: string;
  infoText?: string;
  authorName?: string;
  price?: string;
  ticketUrl?: string;
  startTime?: string;
}

export default function Modal({
  isOpen,
  onClose,
  imageUrl,
  venueName,
  startDate,
  infoText,
  authorName,
  price,
  ticketUrl,
  startTime,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.modal__root}>
      <div className={styles.modal__backdrop} aria-hidden="true" />

      <div className={styles.modal__container}>
        <DialogPanel className={styles.modal__content}>
          <button
            className={styles.modal__closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Event"
              className={styles.modal__image}
              width={102}
              height={102}
            />
          )}

          <div className={styles.modal__body}>
            {infoText && (
              <div className={styles.modal__infoBlock}>
                <h3 className={styles.modal__title}>INFO</h3>
                <p className={styles.modal__text}>{infoText}</p>
              </div>
            )}

            <div className={styles.modal__infoBlock}>
              <h3 className={styles.modal__title}>WHEN</h3>
              <p className={styles.modal__text}>
                {startDate}
                {startTime && (
                  <>
                    <br />
                    {startTime}
                  </>
                )}
              </p>
            </div>

            <div className={styles.modal__infoBlock}>
              <h3 className={styles.modal__title}>WHERE</h3>
              <p className={styles.modal__text}>{venueName}</p>
            </div>

            <div className={styles.modal__infoBlock}>
              <h3 className={styles.modal__title}>WHO</h3>
              <p className={styles.modal__text}>{authorName}</p>
            </div>

            <div className={styles.modal__infoBlock}>
              <h3 className={styles.modal__title}>PRICES</h3>
              <div className={styles.modal__priceRow}>
                <Image
                  src={TicketIcon}
                  alt="Barcode"
                  width={24}
                  height={24}
                  className={styles.modal__barcodeIcon}
                />
                <p className={styles.modal__text}>{price}</p>
              </div>

              {ticketUrl && (
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modal__buyBtn}
                >
                  BUY TICKETS
                </a>
              )}
            </div>

            {authorName && (
              <button className={styles.modal__moreBtn}>MORE FROM THIS AUTHOR</button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
