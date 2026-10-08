import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  add_friend,
  get_friends,
  get_sellers,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import toast from "react-hot-toast";
import socket from "../../utils/socket";
import { FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import sellerPlaceholder from "../../assets/seller.png";

const Chat = () => {
  const scrollRef = useRef();
  const pickerSelectionRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    fb_messages,
    currentFd,
    my_friends,
    successMessage,
    sellers,
    sellersLoading,
    sellersError,
    addFriendLoading,
  } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const [show, setShow] = useState(false);
  const [showSellerPicker, setShowSellerPicker] = useState(false);

  useEffect(() => {
    if (userInfo?._id) {
      socket.emit("add_user", userInfo._id, userInfo);
    }
  }, [userInfo]);

  // Load the conversation list as soon as the customer is known, so the
  // sidebar is populated even on /dashboard/chat with no seller selected.
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_friends());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    // Only fetch a conversation once a seller is actually selected. On the
    // bare /dashboard/chat route there is no :sellerId param, so dispatching
    // here would POST an empty sellerId and fail backend validation.
    if (pickerSelectionRef.current && sellerId !== pickerSelectionRef.current) {
      return;
    }
    if (pickerSelectionRef.current === sellerId) {
      pickerSelectionRef.current = null;
    }
    if (userInfo?._id && sellerId && currentFd?.fdId !== sellerId) {
      dispatch(
        add_friend({
          sellerId,
          userId: userInfo._id,
        }),
      );
    }
  }, [currentFd, dispatch, sellerId, userInfo]);

  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo._id,
          text,
          sellerId,
          name: userInfo.name,
        }),
      );
      setText("");
    }
  };

  const openSellerPicker = () => {
    setShowSellerPicker(true);
    dispatch(get_sellers());
  };

  const selectSeller = async (selectedSellerId) => {
    pickerSelectionRef.current = selectedSellerId;
    try {
      await dispatch(
        add_friend({
          sellerId: selectedSellerId,
          userId: userInfo._id,
        }),
      ).unwrap();
      setShowSellerPicker(false);
      navigate(`/dashboard/chat/${selectedSellerId}`);
    } catch (error) {
      pickerSelectionRef.current = null;
      toast.error(error?.error || "Unable to open chat with this seller");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fb_messages[fb_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo._id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "Send A message");
        dispatch(messageClear());
      }
    }
  }, [receverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fb_messages]);

  return (
    <div className="bg-white p-3 rounded-xl shadow-card">
      <div className="w-full flex">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full -left-[350px] ${show ? "-left-0" : "-left-[350px]"}`}
        >
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <button
            type="button"
            onClick={openSellerPicker}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <AiOutlinePlus />
            <span>Find Sellers</span>
          </button>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py-2 rounded-lg hover:bg-emerald-50 transition-colors`}
              >
                <div className="w-[34px] h-[34px] rounded-full relative">
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 border-2 border-white absolute right-0 bottom-0 z-10"></div>
                  )}

                  <img src={f.image || sellerPlaceholder} className="w-full h-full rounded-full object-cover border border-slate-200" alt="" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[34px] h-[34px] rounded-full relative">
                    {activeSeller.some(
                      (c) => c.sellerId === currentFd.fdId,
                    ) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 border-2 border-white absolute right-0 bottom-0 z-10"></div>
                    )}
                    <img src={currentFd.image || sellerPlaceholder} className="w-full h-full rounded-full object-cover border border-slate-200" alt="" />
                  </div>
                  <span>{currentFd.name}</span>
                </div>

                <div
                  onClick={() => setShow(!show)}
                  className="w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white"
                >
                  <FaList />
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fb_messages.map((m, i) => {
                    if (currentFd?.fdId !== m.receverId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] "
                            src="/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-purple-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] "
                            src="/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-cyan-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="input message"
                    className="w-full rounded-full h-full outline-none p-3"
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-auto">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="w-full h-[400px] flex justify-center items-center text-lg ont-bold text-slate-600"
            >
              <span>Select Seller</span>
            </div>
          )}
        </div>
      </div>
      {showSellerPicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSellerPicker(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="seller-picker-title"
            className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="seller-picker-title" className="text-lg font-semibold text-slate-800">
                Find Sellers
              </h2>
              <button
                type="button"
                onClick={() => setShowSellerPicker(false)}
                aria-label="Close seller list"
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
              >
                <IoClose size={22} />
              </button>
            </div>
            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {sellersLoading ? (
                <p className="py-8 text-center text-slate-500">Loading sellers...</p>
              ) : sellersError ? (
                <div className="py-6 text-center">
                  <p className="mb-3 text-sm text-red-600">{sellersError}</p>
                  <button
                    type="button"
                    onClick={() => dispatch(get_sellers())}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Try again
                  </button>
                </div>
              ) : sellers.length === 0 ? (
                <p className="py-8 text-center text-slate-500">No sellers found.</p>
              ) : (
                sellers.map((seller) => (
                  <button
                    type="button"
                    key={seller._id}
                    disabled={addFriendLoading}
                    onClick={() => selectSeller(seller._id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <img
                      src={seller.image || sellerPlaceholder}
                      alt=""
                      className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-slate-800">
                        {seller.shopInfo?.shopName || "Seller shop"}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        ID: {seller._id}
                      </span>
                    </span>
                    {addFriendLoading && (
                      <span className="text-xs text-slate-500">Opening...</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Chat;
