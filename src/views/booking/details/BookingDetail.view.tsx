import ReactMarkdown from "react-markdown";
import BookingLayout from "../../../components/layout/BookingLayout";
import { IBookingDetailsPage } from "../../../interfaces";
import { motion } from "framer-motion";

export default function BookingDetailView({
  bookingDetail,
}: {
  bookingDetail: IBookingDetailsPage;
}) {
  return (
    <BookingLayout>
      <motion.section
        className="my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-center max-w-xl mx-auto">
          {bookingDetail.heading}
        </h1>
        <div className="p-5 max-w-xl mx-auto">
          <ReactMarkdown className="markdown-text-details">
            {bookingDetail.mainBlock}
          </ReactMarkdown>
        </div>

        {bookingDetail.outroBlock && (
          <div className="p-5 mx-4 max-w-xl md:mx-auto border-2 rounded-lg">
            <ReactMarkdown className="markdown-text-details">
              {bookingDetail.outroBlock}
            </ReactMarkdown>
          </div>
        )}
      </motion.section>
    </BookingLayout>
  );
}
