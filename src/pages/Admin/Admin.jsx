import { useMemo, useState } from "react";
import {
  FaBell,
  FaBookOpen,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaChevronRight,
  FaClipboardList,
  FaDownload,
  FaEdit,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaEye,
  FaFlag,
  FaPlus,
  FaRedo,
  FaSave,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaTicketAlt,
  FaTrash,
  FaUpload,
  FaUserAlt,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineUpcoming, MdQrCodeScanner } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import "./Admin.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: FaChartBar },
  { id: "events", label: "Events", icon: FaCalendarAlt },
  { id: "registrations", label: "Registrations", icon: FaClipboardList },
  { id: "teams", label: "Teams", icon: RiTeamFill },
  { id: "tickets", label: "Tickets", icon: FaTicketAlt },
  { id: "payments", label: "Payments", icon: BsLightningChargeFill },
  { id: "submissions", label: "Submissions", icon: FaUpload },
  { id: "users", label: "Users", icon: FaUserAlt },
  { id: "settings", label: "Settings", icon: IoIosSettings },
];

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");
  const [modal, setModal] = useState(null);

  const analytics = useMemo(
    () => [
      {
        id: "total-users",
        label: "Total Users",
        value: "12,870",
        trend: "+8.2%",
        icon: <FaUsers size={22} />,
        accent: "#2563eb",
      },
      {
        id: "total-events",
        label: "Total Events",
        value: "64",
        trend: "+3 pending",
        icon: <FaCalendarAlt size={22} />,
        accent: "#9333ea",
      },
      {
        id: "total-registrations",
        label: "Total Registrations",
        value: "18,430",
        trend: "+412 today",
        icon: <FaClipboardList size={22} />,
        accent: "#0ea5e9",
      },
      {
        id: "total-payments",
        label: "Payments Success",
        value: "₹2.1Cr",
        trend: "97.1% success",
        icon: <FaChartLine size={22} />,
        accent: "#22c55e",
      },
      {
        id: "total-submissions",
        label: "Total Submissions",
        value: "842",
        trend: "+35 reviewed",
        icon: <FaUpload size={20} />,
        accent: "#f97316",
      },
    ],
    []
  );

  const recentActivity = useMemo(
    () => [
      {
        id: "act-1",
        actor: "Priya Sharma",
        type: "New registration",
        target: "Robotics Hackathon",
        time: "2m ago",
        status: "success",
      },
      {
        id: "act-2",
        actor: "REBECA API",
        type: "Payment settled",
        target: "PAY-90433",
        time: "15m ago",
        status: "success",
      },
      {
        id: "act-3",
        actor: "Arjun Verma",
        type: "Submission flagged",
        target: "Dance Showcase",
        time: "28m ago",
        status: "warning",
      },
      {
        id: "act-4",
        actor: "System Bot",
        type: "Ticket reissued",
        target: "TCK-99124",
        time: "1h ago",
        status: "info",
      },
    ],
    []
  );

  const eventData = useMemo(
    () => ({
      rows: [
        {
          id: "EVT-2035",
          name: "Robotics Hackathon",
          category: "Technology",
          date: "14 Jul 2025",
          venue: "Innovation Lab",
          fee: "₹499",
          submissions: 42,
          teamSize: "2 - 4",
          isIIESTFree: true,
        },
        {
          id: "EVT-2036",
          name: "Campus Cultural Night",
          category: "Cultural",
          date: "18 Jul 2025",
          venue: "Open Amphitheatre",
          fee: "₹199",
          submissions: 58,
          teamSize: "1 - 8",
          isIIESTFree: false,
        },
        {
          id: "EVT-2037",
          name: "Tech Innovators Summit",
          category: "Conference",
          date: "21 Jul 2025",
          venue: "Auditorium A",
          fee: "₹899",
          submissions: 26,
          teamSize: "1 - 3",
          isIIESTFree: false,
        },
      ],
      formDefaults: {
        name: "",
        category: "Workshop",
        description: "",
        poster: "",
        date: "",
        venue: "",
        fee: "0",
        rules: "",
        minTeamSize: 1,
        maxTeamSize: 5,
        isIIESTFree: false,
      },
    }),
    []
  );

  const registrationData = useMemo(
    () => ({
      filters: { status: ["Pending", "Approved", "Cancelled"], type: ["Individual", "Team"] },
      rows: [
        {
          id: "REG-84231",
          user: "Ananya Das",
          event: "Robotics Hackathon",
          status: "Approved",
          type: "Team",
          createdOn: "12 Jul 2025",
        },
        {
          id: "REG-84284",
          user: "Ravi Kumar",
          event: "Campus Cultural Night",
          status: "Pending",
          type: "Individual",
          createdOn: "12 Jul 2025",
        },
        {
          id: "REG-84290",
          user: "Team Byte Benders",
          event: "Hackathon Sprint",
          status: "Approved",
          type: "Team",
          createdOn: "11 Jul 2025",
        },
      ],
    }),
    []
  );

  const teamData = useMemo(
    () => ({
      rows: [
        {
          id: "TEAM-592",
          name: "Quantum Sparks",
          event: "Robotics Hackathon",
          leader: "Ananya Das",
          members: [
            { id: "USR-291", name: "Ananya Das", email: "ananya@rebeca.in", isLeader: true },
            { id: "USR-292", name: "Rishabh Jain", email: "rishabh@rebeca.in" },
            { id: "USR-295", name: "Priya Nair", email: "priya@rebeca.in" },
          ],
        },
        {
          id: "TEAM-598",
          name: "Design Mavericks",
          event: "Poster Design Contest",
          leader: "Isha Mukherjee",
          members: [
            { id: "USR-341", name: "Isha Mukherjee", email: "isha@rebeca.in", isLeader: true },
            { id: "USR-347", name: "Akash Dutta", email: "akash@rebeca.in" },
          ],
        },
      ],
    }),
    []
  );

  const paymentData = useMemo(
    () => ({
      rows: [
        {
          id: "PAY-90211",
          gatewayTxn: "TXN-773812",
          amount: "₹499",
          status: "Success",
          registration: "REG-84231",
          timestamp: "12 Jul 2025 • 09:12 AM",
        },
        {
          id: "PAY-90228",
          gatewayTxn: "TXN-773844",
          amount: "₹899",
          status: "Pending",
          registration: "REG-84290",
          timestamp: "12 Jul 2025 • 11:05 AM",
        },
        {
          id: "PAY-90235",
          gatewayTxn: "TXN-773873",
          amount: "₹199",
          status: "Failed",
          registration: "REG-84284",
          timestamp: "12 Jul 2025 • 11:47 AM",
        },
      ],
    }),
    []
  );

  const ticketData = useMemo(
    () => ({
      rows: [
        {
          id: "TCK-99124",
          registration: "REG-84231",
          event: "Robotics Hackathon",
          attendee: "Ananya Das",
          date: "14 Jul 2025",
          qrUsed: false,
        },
        {
          id: "TCK-99125",
          registration: "REG-84284",
          event: "Campus Cultural Night",
          attendee: "Ravi Kumar",
          date: "18 Jul 2025",
          qrUsed: true,
        },
      ],
    }),
    []
  );

  const submissionData = useMemo(
    () => ({
      rows: [
        {
          id: "SUB-7781",
          entity: "Team Quantum Sparks",
          event: "Robotics Hackathon",
          type: "Video",
          status: "Pending review",
          submittedOn: "11 Jul 2025",
          preview: "https://cdn.rebeca.in/submissions/quantum-preview.mp4",
        },
        {
          id: "SUB-7790",
          entity: "Isha Mukherjee",
          event: "Poster Design Contest",
          type: "Image",
          status: "Approved",
          submittedOn: "10 Jul 2025",
          preview: "https://cdn.rebeca.in/submissions/poster.png",
        },
      ],
    }),
    []
  );

  const userData = useMemo(
    () => ({
      rows: [
        {
          id: "USR-291",
          name: "Ananya Das",
          email: "ananya@rebeca.in",
          phone: "+91 98300 12345",
          college: "IIEST Shibpur / CSE '26",
          type: "IIEST",
          registrations: 5,
          status: "Active",
        },
        {
          id: "USR-315",
          name: "Ravi Kumar",
          email: "ravi.kumar@gmail.com",
          phone: "+91 99880 44121",
          college: "Delhi University",
          type: "Outside",
          registrations: 2,
          status: "Active",
        },
        {
          id: "USR-341",
          name: "Isha Mukherjee",
          email: "isha@rebeca.in",
          phone: "+91 99021 88452",
          college: "IIEST Shibpur / Design '25",
          type: "IIEST",
          registrations: 4,
          status: "Suspended",
        },
      ],
    }),
    []
  );

  const chartMeta = useMemo(
    () => ({
      registrations: [
        { label: "Mon", value: 182 },
        { label: "Tue", value: 221 },
        { label: "Wed", value: 264 },
        { label: "Thu", value: 302 },
        { label: "Fri", value: 328 },
        { label: "Sat", value: 341 },
        { label: "Sun", value: 198 },
      ],
      payments: [
        { label: "Success", value: 92 },
        { label: "Pending", value: 5 },
        { label: "Failed", value: 3 },
      ],
      popularity: [
        { event: "Robotics", value: 84 },
        { event: "Cultural Night", value: 72 },
        { event: "Gaming Cup", value: 66 },
        { event: "Tech Summit", value: 53 },
        { event: "Design Contest", value: 41 },
      ],
    }),
    []
  );

  const handleLogin = event => {
    event.preventDefault();
  };
  const logout = () => {
    setActivePage("dashboard");
  };

  const renderModal = () => {
    if (!modal) return null;
    const close = () => setModal(null);

    if (modal.type === "create-event" || modal.type === "edit-event") {
      const isEdit = modal.type === "edit-event";
      return (
        <Modal title={`${isEdit ? "Edit" : "Create"} event`} onClose={close}>
          <EventForm formState={modal.payload ?? eventData.formDefaults} onCancel={close} />
        </Modal>
      );
    }

    if (modal.type === "team-details") {
      return (
        <Modal title="Team details" onClose={close} size="medium">
          <TeamDetails team={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "registration-details") {
      return (
        <Modal title="Registration" onClose={close} size="medium">
          <RegistrationDetails registration={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "payment-details") {
      return (
        <Modal title="Payment" onClose={close} size="medium">
          <PaymentDetails payment={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "user-profile") {
      return (
        <Modal title="User profile" onClose={close} size="medium">
          <UserProfile user={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "ticket-preview") {
      return (
        <Modal title="Ticket" onClose={close} size="small">
          <TicketPreview ticket={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "submission-preview") {
      return (
        <Modal title="Submission" onClose={close} size="medium">
          <SubmissionPreview submission={modal.payload} />
        </Modal>
      );
    }

    if (modal.type === "confirm-delete") {
      return (
        <Modal title="Delete event" onClose={close} size="small">
          <p className="modal-subcopy">
            This action will remove the event and all related registrations. Continue?
          </p>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={close}>
              Cancel
            </button>
            <button type="button" className="danger">
              <FaTrash /> Delete event
            </button>
          </div>
        </Modal>
      );
    }

    return null;
  };

  const renderSection = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardSection analytics={analytics} recentActivity={recentActivity} charts={chartMeta} />;
      case "events":
        return (
          <EventsSection
            data={eventData}
            onCreate={() => setModal({ type: "create-event" })}
            onEdit={row => setModal({ type: "edit-event", payload: row })}
            onDelete={() => setModal({ type: "confirm-delete" })}
          />
        );
      case "registrations":
        return (
          <RegistrationsSection
            data={registrationData}
            onView={row => setModal({ type: "registration-details", payload: row })}
          />
        );
      case "teams":
        return <TeamsSection data={teamData} onView={row => setModal({ type: "team-details", payload: row })} />;
      case "tickets":
        return <TicketsSection data={ticketData} onPreview={ticket => setModal({ type: "ticket-preview", payload: ticket })} />;
      case "payments":
        return <PaymentsSection data={paymentData} onView={row => setModal({ type: "payment-details", payload: row })} />;
      case "submissions":
        return <SubmissionsSection data={submissionData} onPreview={row => setModal({ type: "submission-preview", payload: row })} />;
      case "users":
        return <UsersSection data={userData} onView={row => setModal({ type: "user-profile", payload: row })} />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-root">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={logout} />

      <div className="admin-main">
        <TopBar
          activePage={activePage}
          onSearch={setGlobalSearch}
          searchValue={globalSearch}
          notifications={recentActivity}
        />

        <main className="admin-content">{renderSection()}</main>
      </div>

      {renderModal()}
    </div>
  );
}

function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-avatar">R</div>
        <div>
          <strong>REBECA</strong>
          <small>Fest Management</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={isActive ? "active" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="status">
          <FaShieldAlt size={16} />
          <div>
            <p>System health</p>
            <small className="success">All systems operational</small>
          </div>
        </div>
        <button type="button" className="logout" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}

function TopBar({ activePage, onSearch, searchValue, notifications }) {
  const activeItem = NAV_ITEMS.find(item => item.id === activePage);

  return (
    <header className="admin-topbar">
      <div className="breadcrumbs">
        <span>Admin console</span>
        <FaChevronRight size={10} />
        <strong>{activeItem?.label ?? "Dashboard"}</strong>
      </div>

      <div className="topbar-actions">
        <div className="search-input">
          <FaSearch size={16} />
          <input
            type="search"
            placeholder="Search events, users, teams..."
            value={searchValue}
            onChange={event => onSearch(event.target.value)}
          />
        </div>

        <button type="button" className="icon">
          <FaBell size={16} />
          <span className="badge">4</span>
        </button>

        <div className="admin-avatar">
          <FaUserCircle size={30} />
          <div>
            <strong>Super Admin</strong>
            <small>Operations lead</small>
          </div>
        </div>
      </div>

      <div className="topbar-notifications">
        <h4>Recent activity</h4>
        <ul>
          {notifications.map(item => (
            <li key={item.id}>
              <span className={`pill ${item.status}`}></span>
              <div>
                <p>
                  <strong>{item.actor}</strong> · {item.type}
                </p>
                <small>{item.target}</small>
              </div>
              <time>{item.time}</time>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function DashboardSection({ analytics, recentActivity, charts }) {
  const [showRecentActivity, setShowRecentActivity] = useState(true);

  return (
    <section className="dashboard-section">
      <header className="section-header">
        <div>
          <h1>Overview</h1>
          <p>Monitor the health of REBECA Fest across registrations, payments, and activity.</p>
        </div>
        <button type="button" className="secondary">
          <FaDownload /> Download report
        </button>
      </header>

      <div className="dashboard-metrics">
        {analytics.map(metric => (
          <article key={metric.id} className="metric-card" style={{ borderColor: metric.accent }}>
            <div className="metric-icon" style={{ backgroundColor: `${metric.accent}12`, color: metric.accent }}>
              {metric.icon}
            </div>
            <div>
              <p>{metric.label}</p>
              <h2>{metric.value}</h2>
              <span>{metric.trend}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="dashboard-analytics">
        <div className="chart-card">
          <header>
            <h3>Daily registrations</h3>
            <button type="button" className="chip">Last 7 days</button>
          </header>
          <div className="chart-bars">
            {charts.registrations.map(item => (
              <div key={item.label}>
                <div style={{ height: `${item.value / 4}%` }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <header>
            <h3>Payments overview</h3>
            <button type="button" className="chip">Current week</button>
          </header>
          <div className="chart-pie">
            {charts.payments.map(item => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <header>
            <h3>Event popularity</h3>
            <button type="button" className="chip">Top 5 events</button>
          </header>
          <ul className="chart-list">
            {charts.popularity.map(item => (
              <li key={item.event}>
                <span>{item.event}</span>
                <div>
                  <div style={{ width: `${item.value}%` }} />
                  <strong>{item.value}%</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showRecentActivity ? (
        <div className="panel recent">
          <div className="panel-heading">
            <h3>
              <FaBell size={16} /> Recent activity
            </h3>
            <div className="panel-tools">
              <button type="button" className="link">View audit trail</button>
              <button
                type="button"
                className="icon-close"
                aria-label="Hide recent activity"
                onClick={() => setShowRecentActivity(false)}
              >
                <IoMdClose size={16} />
              </button>
            </div>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Actor</th>
                <th scope="col">Action</th>
                <th scope="col">Context</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(item => (
                <tr key={item.id}>
                  <td>{item.actor}</td>
                  <td>{item.type}</td>
                  <td>{item.target}</td>
                  <td>{item.time}</td>
                  <td>
                    <span className={`status-pill ${item.status}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

function EventsSection({ data, onCreate, onEdit, onDelete }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Event management</h1>
          <p>Monitor, create, edit, and publish festival events.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary">
            <FaDownload /> Export CSV
          </button>
          <button type="button" className="primary" onClick={onCreate}>
            <FaPlus /> Create event
          </button>
        </div>
      </header>

      <div className="filters">
        <div className="search-input">
          <FaSearch size={16} />
          <input type="search" placeholder="Search events" />
        </div>
        <select>
          <option>All categories</option>
          <option>Technology</option>
          <option>Cultural</option>
          <option>Workshops</option>
          <option>Sports</option>
        </select>
        <select>
          <option>Status: Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">Category</th>
            <th scope="col">Date & venue</th>
            <th scope="col">Fee</th>
            <th scope="col">Submissions</th>
            <th scope="col">Team size</th>
            <th scope="col">IIEST free</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>
                <div className="cell-leading">
                  <div className="avatar" data-seed={row.name.slice(0, 2)}></div>
                  <div>
                    <strong>{row.name}</strong>
                    <small>{row.id}</small>
                  </div>
                </div>
              </td>
              <td>{row.category}</td>
              <td>
                <span>{row.date}</span>
                <small>{row.venue}</small>
              </td>
              <td>{row.fee}</td>
              <td>{row.submissions}</td>
              <td>{row.teamSize}</td>
              <td>
                <span className={`status-pill ${row.isIIESTFree ? "success" : "warning"}`}>
                  {row.isIIESTFree ? "Free" : "Paid"}
                </span>
              </td>
              <td className="cell-actions">
                <button type="button" onClick={() => onEdit(row)}>
                  <FaEdit /> Edit
                </button>
                <button type="button" className="danger" onClick={onDelete}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function RegistrationsSection({ data, onView }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Registrations</h1>
          <p>Track participant registrations and manage approvals across events.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary">
            <IoMdRefresh /> Refresh
          </button>
          <button type="button" className="secondary">
            <FaDownload /> Export
          </button>
        </div>
      </header>

      <div className="filters">
        <div className="search-input">
          <FaSearch size={16} />
          <input type="search" placeholder="Search registration ID" />
        </div>
        <select>
          <option>All statuses</option>
          {data.filters.status.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select>
          <option>All types</option>
          {data.filters.type.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <input type="date" />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Registration</th>
            <th scope="col">Participant</th>
            <th scope="col">Event</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Created on</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.user}</td>
              <td>{row.event}</td>
              <td>
                <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
              </td>
              <td>{row.type}</td>
              <td>{row.createdOn}</td>
              <td className="cell-actions">
                <button type="button" onClick={() => onView(row)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function TeamsSection({ data, onView }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Team management</h1>
          <p>Collaborative registrations with member rosters and event assignment.</p>
        </div>
        <button type="button" className="primary">
          <FaPlus /> Create team
        </button>
      </header>

      <div className="filters">
        <div className="search-input">
          <FaSearch size={16} />
          <input type="search" placeholder="Search team or leader" />
        </div>
        <select>
          <option>All events</option>
          <option>Robotics Hackathon</option>
          <option>Poster Design Contest</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Team</th>
            <th scope="col">Event</th>
            <th scope="col">Leader</th>
            <th scope="col">Members</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.event}</td>
              <td>{row.leader}</td>
              <td>{row.members.length}</td>
              <td className="cell-actions">
                <button type="button" onClick={() => onView(row)}>
                  <FaEye />
                </button>
                <button type="button">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function TicketsSection({ data, onPreview }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Ticket management</h1>
          <p>Track ticket issuance, QR scans, and quick reissues.</p>
        </div>
        <button type="button" className="secondary">
          <MdQrCodeScanner size={18} /> Live scan feed
        </button>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Ticket</th>
            <th scope="col">Registration</th>
            <th scope="col">Event</th>
            <th scope="col">Attendee</th>
            <th scope="col">Date</th>
            <th scope="col">QR status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.registration}</td>
              <td>{row.event}</td>
              <td>{row.attendee}</td>
              <td>{row.date}</td>
              <td>
                <span className={`status-pill ${row.qrUsed ? "warning" : "success"}`}>
                  {row.qrUsed ? "Used" : "Active"}
                </span>
              </td>
              <td className="cell-actions">
                <button type="button" onClick={() => onPreview(row)}>
                  <FaEye />
                </button>
                <button type="button" className="secondary">
                  <FaRedo /> Reissue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function PaymentsSection({ data, onView }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Payments</h1>
          <p>Transaction overview with gateway reconciliation.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary">
            <FaRedo /> Retry failed
          </button>
          <button type="button" className="secondary">
            <FaDownload /> Export reconciliation
          </button>
        </div>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Payment ID</th>
            <th scope="col">Txn ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Registration</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.gatewayTxn}</td>
              <td>{row.amount}</td>
              <td>
                <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
              </td>
              <td>{row.registration}</td>
              <td>{row.timestamp}</td>
              <td className="cell-actions">
                <button type="button" onClick={() => onView(row)}>
                  <FaEye />
                </button>
                <button type="button">
                  <IoMdRefresh />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SubmissionsSection({ data, onPreview }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Submissions</h1>
          <p>Manage design decks, technical builds, and performance recordings.</p>
        </div>
        <button type="button" className="secondary">
          <FaFlag /> Moderation queue
        </button>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Submission</th>
            <th scope="col">Event</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Submitted on</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.entity}</td>
              <td>{row.event}</td>
              <td>{row.type}</td>
              <td>
                <span className={`status-pill ${row.status.includes("Approved") ? "success" : "info"}`}>
                  {row.status}
                </span>
              </td>
              <td>{row.submittedOn}</td>
              <td className="cell-actions">
                <button type="button" onClick={() => onPreview(row)}>
                  <FaEye />
                </button>
                <button type="button" className="danger">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function UsersSection({ data, onView }) {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>User directory</h1>
          <p>Participant roster with contact details and registration history.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary">
            <FaDownload /> Export contacts
          </button>
        </div>
      </header>

      <div className="filters">
        <div className="search-input">
          <FaSearch size={16} />
          <input type="search" placeholder="Search name, email, or phone" />
        </div>
        <select>
          <option>All user types</option>
          <option>IIEST</option>
          <option>Outside</option>
        </select>
        <select>
          <option>Status: Any</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">College / Roll</th>
            <th scope="col">Type</th>
            <th scope="col">Registrations</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.college}</td>
              <td>{row.type}</td>
              <td>{row.registrations}</td>
              <td>
                <span className={`status-pill ${row.status === "Active" ? "success" : "warning"}`}>
                  {row.status}
                </span>
              </td>
              <td className="cell-actions">
                <button type="button" onClick={() => onView(row)}>
                  <FaEye />
                </button>
                <button type="button" className="danger">
                  <FaExclamationTriangle /> Disable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SettingsSection() {
  return (
    <section className="admin-section">
      <header className="section-header">
        <div>
          <h1>Settings & platform controls</h1>
          <p>Authentication policies, communication templates, and integrations.</p>
        </div>
        <button type="button" className="primary">
          <FaSave /> Save changes
        </button>
      </header>

      <div className="settings-grid">
        <div className="settings-card">
          <h2>Security & sessions</h2>
          <p>Configure JWT expiry, trusted devices, and MFA enrollment.</p>
          <label>
            <span>Session timeout (minutes)</span>
            <input type="number" defaultValue={45} />
          </label>
          <label>
            <span>Require MFA for new devices</span>
            <div className="toggle">
              <input type="checkbox" defaultChecked />
              <span></span>
            </div>
          </label>
          <label>
            <span>Allow passwordless login</span>
            <div className="toggle">
              <input type="checkbox" />
              <span></span>
            </div>
          </label>
        </div>

        <div className="settings-card">
          <h2>Communications</h2>
          <p>Templates for confirmations, receipts, and submission reviews.</p>
          <label>
            <span>Support email</span>
            <input type="email" defaultValue="support@rebeca.in" />
          </label>
          <label>
            <span>Notification strategy</span>
            <select defaultValue="digest">
              <option value="realtime">Real-time alerts</option>
              <option value="digest">Daily digest</option>
              <option value="minimal">Minimal alerts</option>
            </select>
          </label>
          <label className="multi">
            <span>Webhook endpoint</span>
            <input type="url" placeholder="https://hooks.rebeca.in/admin" />
            <button type="button" className="secondary">
              <FaUpload /> Test webhook
            </button>
          </label>
        </div>

        <div className="settings-card">
          <h2>Integrations</h2>
          <p>Connect payment gateways, analytics suites, and support desks.</p>
          <div className="integration-list">
            <label>
              <input type="checkbox" defaultChecked /> Razorpay Gateway
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Google Analytics 4
            </label>
            <label>
              <input type="checkbox" /> Slack Alert Bot
            </label>
            <label>
              <input type="checkbox" /> Freshdesk Support Desk
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventForm({ formState, onCancel }) {
  return (
    <form className="admin-form">
      <div className="form-grid">
        <label>
          <span>Event name</span>
          <input type="text" defaultValue={formState.name} placeholder="Enter event title" />
        </label>
        <label>
          <span>Category</span>
          <select defaultValue={formState.category}>
            <option>Workshop</option>
            <option>Technology</option>
            <option>Cultural</option>
            <option>Sports</option>
          </select>
        </label>
        <label>
          <span>Date</span>
          <input type="date" defaultValue={formState.date} />
        </label>
        <label>
          <span>Venue</span>
          <input type="text" defaultValue={formState.venue} placeholder="Enter venue" />
        </label>
        <label>
          <span>Registration fee</span>
          <input type="number" defaultValue={formState.fee} min={0} />
        </label>
        <label>
          <span>Poster image</span>
          <div className="upload-input">
            <FaUpload />
            <span>Upload poster</span>
          </div>
        </label>
        <label>
          <span>Min team size</span>
          <input type="number" defaultValue={formState.minTeamSize} min={1} />
        </label>
        <label>
          <span>Max team size</span>
          <input type="number" defaultValue={formState.maxTeamSize} min={1} />
        </label>
        <label className="toggle-field">
          <span>Free for IIEST students</span>
          <div className="toggle">
            <input type="checkbox" defaultChecked={formState.isIIESTFree} />
            <span></span>
          </div>
        </label>
      </div>

      <label className="full">
        <span>Description</span>
        <textarea rows={4} defaultValue={formState.description} placeholder="Describe the event experience"></textarea>
      </label>

      <label className="full">
        <span>Rules (JSON or Markdown)</span>
        <textarea rows={6} defaultValue={formState.rules} placeholder="Provide rules in structured format"></textarea>
      </label>

      <div className="modal-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary">
          <FaSave /> Save event
        </button>
      </div>
    </form>
  );
}

function TeamDetails({ team }) {
  return (
    <div className="team-details">
      <section>
        <h4>Team overview</h4>
        <div className="detail-grid">
          <div>
            <span>Team name</span>
            <strong>{team.name}</strong>
          </div>
          <div>
            <span>Event</span>
            <strong>{team.event}</strong>
          </div>
          <div>
            <span>Leader</span>
            <strong>{team.leader}</strong>
          </div>
          <div>
            <span>Total members</span>
            <strong>{team.members.length}</strong>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h4>Members</h4>
          <button type="button" className="secondary">
            <FaPlus /> Add member
          </button>
        </div>
        <ul className="member-list">
          {team.members.map(member => (
            <li key={member.id}>
              <div>
                <strong>{member.name}</strong>
                <small>{member.email}</small>
              </div>
              <div>
                {member.isLeader ? <span className="status-pill info">Leader</span> : null}
                <button type="button" className="danger">
                  <FaTrash /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function RegistrationDetails({ registration }) {
  return (
    <div className="detail-grid">
      <div>
        <span>Registration ID</span>
        <strong>{registration.id}</strong>
      </div>
      <div>
        <span>Participant</span>
        <strong>{registration.user}</strong>
        <small>{registration.type}</small>
      </div>
      <div>
        <span>Event</span>
        <strong>{registration.event}</strong>
      </div>
      <div>
        <span>Status</span>
        <strong>{registration.status}</strong>
      </div>
      <div>
        <span>Created on</span>
        <strong>{registration.createdOn}</strong>
      </div>
      <div className="full">
        <button type="button" className="secondary">
          <FaBell /> Notify participant
        </button>
      </div>
    </div>
  );
}

function PaymentDetails({ payment }) {
  return (
    <div className="detail-grid">
      <div>
        <span>Payment ID</span>
        <strong>{payment.id}</strong>
      </div>
      <div>
        <span>Gateway transaction</span>
        <strong>{payment.gatewayTxn}</strong>
      </div>
      <div>
        <span>Amount</span>
        <strong>{payment.amount}</strong>
      </div>
      <div>
        <span>Status</span>
        <strong>{payment.status}</strong>
      </div>
      <div>
        <span>Registration</span>
        <strong>{payment.registration}</strong>
      </div>
      <div>
        <span>Timestamp</span>
        <strong>{payment.timestamp}</strong>
      </div>
      <div className="button-row full">
        <button type="button" className="secondary">
          <FaRedo /> Retry
        </button>
        <button type="button" className="danger">
          <FaExclamationCircle /> Mark as failed
        </button>
      </div>
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <FaUserCircle size={48} />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <span className={`status-pill ${user.status === "Active" ? "success" : "warning"}`}>
          {user.status}
        </span>
      </div>
      <div className="detail-grid">
        <div>
          <span>Phone</span>
          <strong>{user.phone}</strong>
        </div>
        <div>
          <span>College / Roll</span>
          <strong>{user.college}</strong>
        </div>
        <div>
          <span>Type</span>
          <strong>{user.type}</strong>
        </div>
        <div>
          <span>Total registrations</span>
          <strong>{user.registrations}</strong>
        </div>
      </div>
      <div className="button-row">
        <button type="button" className="primary">
          <FaBell /> Send message
        </button>
        <button type="button" className="danger">
          <FaExclamationTriangle /> Disable user
        </button>
      </div>
    </div>
  );
}

function TicketPreview({ ticket }) {
  return (
    <div className="ticket-preview">
      <div className="ticket-qr">QR Preview</div>
      <div>
        <strong>{ticket.attendee}</strong>
        <p>{ticket.event}</p>
        <small>{ticket.date}</small>
        <span>{ticket.id}</span>
      </div>
      <button type="button" className="secondary">
        <FaDownload /> Download PDF
      </button>
    </div>
  );
}

function SubmissionPreview({ submission }) {
  return (
    <div className="submission-preview">
      <div className="preview-box">
        <span>Preview</span>
        <code>{submission.preview}</code>
      </div>
      <div className="detail-grid">
        <div>
          <span>Submitted by</span>
          <strong>{submission.entity}</strong>
        </div>
        <div>
          <span>Event</span>
          <strong>{submission.event}</strong>
        </div>
        <div>
          <span>Type</span>
          <strong>{submission.type}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{submission.status}</strong>
        </div>
        <div>
          <span>Submitted on</span>
          <strong>{submission.submittedOn}</strong>
        </div>
      </div>
      <div className="button-row">
        <button type="button" className="primary">
          <FaCheckCircle /> Approve
        </button>
        <button type="button" className="danger">
          <FaTrash /> Delete
        </button>
        <button type="button" className="secondary">
          <FaFlag /> Flag
        </button>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, size = "large" }) {
  return (
    <div className="modal-backdrop">
      <div className={`modal ${size}`}>
        <header>
          <h2>{title}</h2>
          <button type="button" onClick={onClose}>
            <IoMdClose size={18} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
