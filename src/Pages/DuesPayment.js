 const DuesPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    if (!storedUser) {
      navigate('/signin');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim() || token.length !== 6 || !/^\d{6}$/.test(token)) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit code' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.put(
        `https://campusbuy-backend-nkmx.onrender.com/mobilcreateuser/confirmpayment/${id}`,
        { token: token.trim(), year: true }
      );

      setMessage({
        type: 'success',
        text: response.data.message || 'Payment confirmation submitted successfully.'
      });

      setToken('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit confirmation.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F5B] via-[#001845] to-[#0A3D6B] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-white hover:underline"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Annual Membership Dues Payment
          </h1>
          <p className="text-xl opacity-90">
            Please transfer your dues to the account below.
          </p>
        </div>

        {/* Bank Details */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 mb-12 border border-white/20">
          <p className="text-xl mb-3"><strong>Bank:</strong> UBA</p>
          <p className="text-xl mb-3"><strong>Account Name:</strong> EXXONMOBIL RETIREES ASSOCIATION OF NIGERIA</p>
          <p className="text-xl mb-6"><strong>Account Number:</strong> 1028320811</p>
          <p className="opacity-90">
            After making your transfer, enter the last 6 digits of your transaction reference below.
          </p>
        </div>

        {/* Confirmation Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">

            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit reference"
              className="w-full px-6 py-5 text-3xl font-mono text-center bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:border-[#E30613]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl font-bold text-xl transition ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#E30613] hover:bg-[#c20511]'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin inline mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle className="inline mr-2" />
                  Confirm Payment
                </>
              )}
            </button>

            {message.text && (
              <div
                className={`mt-6 p-5 rounded-xl text-center text-lg ${
                  message.type === 'success'
                    ? 'bg-green-600/20 border border-green-400 text-green-200'
                    : 'bg-red-600/20 border border-red-400 text-red-200'
                }`}
              >
                <span>{message.text}</span>
                {message.type === 'success' && (
                  <div className="mt-2 text-base border-t border-green-400/30 pt-2 font-medium">
                    Also, please send your transfer receipt to{' '}
                    <a
                      href="mailto:emranwebmgt@gmail.com?subject=EMRAN%20Dues%20Transfer%20Receipt"
                      className="underline text-white hover:text-green-300 font-bold transition"
                    >
                      emranwebmgt@gmail.com
                    </a>
                  </div>
                )}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default DuesPayment ;
