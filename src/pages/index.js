import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { 
  Plus, ExternalLink, Calendar, DollarSign, Users, Heart,
  MapPin, CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronRight, 
  Trash2, RefreshCw, Download, UserCheck, Home, Gift, Handshake,
  Camera, Megaphone, LayoutDashboard, TrendingUp
} from 'lucide-react'

// Logo Component - Lucky Day (four-leaf clover / sunshine theme)
const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="luckyGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    {/* Sun rays */}
    <circle cx="50" cy="50" r="35" fill="url(#luckyGradient)" />
    <circle cx="50" cy="50" r="25" fill="#fef3c7" />
    {/* Heart in center */}
    <path 
      d="M50 70C50 70 35 55 35 45C35 38 40 35 47 35C50 35 50 38 50 38C50 38 50 35 53 35C60 35 65 38 65 45C65 55 50 70 50 70Z" 
      fill="url(#luckyGradient)"
    />
  </svg>
)

// Status Badge Component
const StatusBadge = ({ status }) => {
  const configs = {
    high: { bg: 'bg-red-50', color: 'text-red-700', border: 'border-red-200', label: 'High' },
    medium: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Medium' },
    low: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Low' },
    pending: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Pending' },
    completed: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Done' },
    in_progress: { bg: 'bg-sky-50', color: 'text-sky-700', border: 'border-sky-200', label: 'In Progress' },
    active: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Active' },
    housed: { bg: 'bg-green-50', color: 'text-green-700', border: 'border-green-200', label: 'Housed' },
    inactive: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-200', label: 'Inactive' },
    prospect: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-200', label: 'Prospect' },
    onboarding: { bg: 'bg-sky-50', color: 'text-sky-700', border: 'border-sky-200', label: 'Onboarding' },
    planned: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Planned' },
    confirmed: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Confirmed' },
    cancelled: { bg: 'bg-red-50', color: 'text-red-700', border: 'border-red-200', label: 'Cancelled' },
    draft: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-200', label: 'Draft' },
    review: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Review' },
    approved: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Approved' },
    published: { bg: 'bg-green-50', color: 'text-green-700', border: 'border-green-200', label: 'Published' },
    pipeline: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-200', label: 'Pipeline' },
    researching: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Researching' },
    applying: { bg: 'bg-sky-50', color: 'text-sky-700', border: 'border-sky-200', label: 'Applying' },
    submitted: { bg: 'bg-emerald-50', color: 'text-emerald-700', border: 'border-emerald-200', label: 'Submitted' },
    awarded: { bg: 'bg-green-50', color: 'text-green-700', border: 'border-green-200', label: 'Awarded' },
    declined: { bg: 'bg-red-50', color: 'text-red-700', border: 'border-red-200', label: 'Declined' },
    pitched: { bg: 'bg-violet-50', color: 'text-violet-700', border: 'border-violet-200', label: 'Pitched' },
    interested: { bg: 'bg-sky-50', color: 'text-sky-700', border: 'border-sky-200', label: 'Interested' },
    lapsed: { bg: 'bg-slate-50', color: 'text-slate-600', border: 'border-slate-200', label: 'Lapsed' },
    major: { bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-200', label: 'Major' },
  }
  const config = configs[status] || configs.medium
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}>
      {config.label}
    </span>
  )
}

// Section Header Component
const SectionHeader = ({ icon: Icon, title, count, onAdd, collapsed, onToggle }) => (
  <div 
    onClick={onToggle}
    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl mb-3 cursor-pointer select-none hover:from-slate-100 hover:to-slate-50 transition-all duration-200 border border-slate-100"
  >
    <div className="flex items-center gap-3">
      {collapsed !== undefined && (
        <div className={`p-1 rounded-lg ${collapsed ? 'bg-slate-100' : 'bg-green-50'}`}>
          {collapsed ? <ChevronRight size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-green-600" />}
        </div>
      )}
      <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-amber-500">
        <Icon size={18} className="text-white" />
      </div>
      <span className="font-semibold text-slate-800">{title}</span>
      <span className="bg-gradient-to-r from-green-500 to-amber-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
        {count}
      </span>
    </div>
    {onAdd && (
      <button
        onClick={(e) => { e.stopPropagation(); onAdd(); }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-amber-600 transition-all duration-200 shadow-sm hover:shadow"
      >
        <Plus size={14} /> Add
      </button>
    )}
  </div>
)

// Card wrapper
const Card = ({ children, className = '', highlight = false }) => (
  <div className={`p-4 bg-white rounded-xl border border-slate-100 mb-3 transition-all duration-200 hover:border-slate-200 hover:shadow-md ${highlight ? 'border-l-4 border-l-green-500' : ''} ${className}`}>
    {children}
  </div>
)

// Styled Select Component
const StyledSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
)

// Task Item Component
const TaskItem = ({ task, onUpdate, onDelete }) => {
  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'completed'
  
  return (
    <Card className={isOverdue ? 'bg-red-50/50 border-red-100' : ''}>
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onUpdate({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' })}
            className="w-5 h-5 rounded-md border-2 border-slate-300 text-green-500 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {task.title}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
              <Clock size={12} />
              {new Date(task.due_date).toLocaleDateString()}
            </span>
            <StatusBadge status={task.priority} />
            {task.category && <span className="text-xs text-slate-400">{task.category}</span>}
          </div>
        </div>
        <button onClick={() => onDelete(task.id)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
          <Trash2 size={14} className="text-slate-300 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
    </Card>
  )
}

// Recipient Item Component
const RecipientItem = ({ recipient, onUpdate }) => (
  <Card highlight={recipient.status === 'active'}>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-slate-800">{recipient.name}</span>
          <StatusBadge status={recipient.status} />
        </div>
        <div className="text-sm text-slate-500 mb-2 flex items-center gap-1.5">
          <MapPin size={14} className="text-slate-400" /> {recipient.location}
        </div>
        {recipient.story && <div className="text-sm text-slate-600 mb-2">{recipient.story}</div>}
        {recipient.needs?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipient.needs.map((need, i) => (
              <span key={i} className="px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">{need}</span>
            ))}
          </div>
        )}
        {recipient.case_worker && <div className="text-xs text-slate-400 mt-2">Case worker: {recipient.case_worker}</div>}
      </div>
      <StyledSelect
        value={recipient.status}
        onChange={(e) => onUpdate({ ...recipient, status: e.target.value })}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'housed', label: 'Housed' },
          { value: 'relocated', label: 'Relocated' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  </Card>
)

// Donor Item Component
const DonorItem = ({ donor, onUpdate }) => (
  <Card>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-slate-800">{donor.name}</span>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
            {donor.donor_type}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {donor.total_given > 0 && <span className="text-emerald-600 font-semibold">${donor.total_given.toLocaleString()} given</span>}
          {donor.frequency && <span className="text-slate-500">{donor.frequency}</span>}
        </div>
        {donor.last_donation && <div className="text-xs text-slate-400 mt-2">Last donation: {new Date(donor.last_donation).toLocaleDateString()}</div>}
      </div>
      <StyledSelect
        value={donor.status}
        onChange={(e) => onUpdate({ ...donor, status: e.target.value })}
        options={[
          { value: 'prospect', label: 'Prospect' },
          { value: 'active', label: 'Active' },
          { value: 'major', label: 'Major Donor' },
          { value: 'lapsed', label: 'Lapsed' },
        ]}
      />
    </div>
  </Card>
)

// Volunteer Item Component
const VolunteerItem = ({ volunteer, onUpdate }) => (
  <Card>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-slate-800">{volunteer.name}</span>
          <span className="px-2 py-0.5 bg-sky-100 text-sky-700 border border-sky-200 rounded-full text-xs font-medium">
            {volunteer.role}
          </span>
          {volunteer.background_check && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-medium">✓ Cleared</span>
          )}
        </div>
        {volunteer.availability && <div className="text-sm text-slate-500 mb-1">Available: {volunteer.availability}</div>}
        {volunteer.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {volunteer.skills.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{skill}</span>
            ))}
          </div>
        )}
        {volunteer.hours_logged > 0 && <div className="text-xs text-slate-400 mt-2">{volunteer.hours_logged} hours logged</div>}
      </div>
      <StyledSelect
        value={volunteer.status}
        onChange={(e) => onUpdate({ ...volunteer, status: e.target.value })}
        options={[
          { value: 'prospect', label: 'Prospect' },
          { value: 'onboarding', label: 'Onboarding' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  </Card>
)

// Partner Item Component
const PartnerItem = ({ partner, onUpdate }) => (
  <Card>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-slate-800">{partner.name}</span>
          <span className="px-2 py-0.5 bg-violet-100 text-violet-700 border border-violet-200 rounded-full text-xs font-medium">
            {partner.organization_type}
          </span>
        </div>
        <div className="text-sm text-slate-500 mb-2 flex items-center gap-1.5">
          <MapPin size={14} className="text-slate-400" /> {partner.location}
        </div>
        {partner.contact_name && <div className="text-sm text-slate-600 mb-1">Contact: {partner.contact_name}</div>}
        {partner.services_offered?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {partner.services_offered.map((service, i) => (
              <span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{service}</span>
            ))}
          </div>
        )}
      </div>
      <StyledSelect
        value={partner.status}
        onChange={(e) => onUpdate({ ...partner, status: e.target.value })}
        options={[
          { value: 'prospect', label: 'Prospect' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  </Card>
)

// Outreach Event Item Component
const EventItem = ({ event, onUpdate }) => {
  const daysUntil = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))
  const isPast = daysUntil < 0
  const isUpcoming = daysUntil >= 0 && daysUntil <= 7

  return (
    <Card className={isPast ? 'opacity-60' : ''} highlight={isUpcoming}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-slate-800">{event.name}</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-medium">
              {event.event_type?.replace('_', ' ')}
            </span>
          </div>
          <div className="text-sm text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-400" />
            {new Date(event.date).toLocaleDateString()}
            {!isPast && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${isUpcoming ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
              </span>
            )}
          </div>
          <div className="text-sm text-slate-600 flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400" /> {event.location}
          </div>
          <div className="flex gap-4 mt-2 text-xs text-slate-500">
            {event.volunteers_needed > 0 && <span>Volunteers: {event.volunteers_confirmed || 0}/{event.volunteers_needed}</span>}
            {event.recipients_served > 0 && <span>Served: {event.recipients_served}</span>}
          </div>
        </div>
        <StyledSelect
          value={event.status}
          onChange={(e) => onUpdate({ ...event, status: e.target.value })}
          options={[
            { value: 'planned', label: 'Planned' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </div>
    </Card>
  )
}

// Grant Item Component
const GrantItem = ({ grant, onUpdate }) => {
  const deadline = grant.deadline
  const isRolling = deadline === 'Rolling' || !deadline
  const deadlineDate = isRolling ? null : new Date(deadline)
  const daysUntil = deadlineDate ? Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24)) : null
  const isUrgent = daysUntil !== null && daysUntil <= 30 && daysUntil > 0

  return (
    <Card highlight={isUrgent}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-slate-800">{grant.title}</span>
            <StatusBadge status={grant.fit} />
          </div>
          <div className="text-sm text-slate-500 mb-2">{grant.funder}</div>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-emerald-600 font-semibold">{grant.amount}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar size={14} />
              {isRolling ? 'Rolling' : deadline}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <StyledSelect
            value={grant.status}
            onChange={(e) => onUpdate({ ...grant, status: e.target.value })}
            options={[
              { value: 'pipeline', label: 'Pipeline' },
              { value: 'researching', label: 'Researching' },
              { value: 'applying', label: 'Applying' },
              { value: 'submitted', label: 'Submitted' },
              { value: 'awarded', label: 'Awarded' },
              { value: 'declined', label: 'Declined' },
            ]}
          />
          {grant.link && (
            <a href={grant.link} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 p-1">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

// Impact Story Item Component
const StoryItem = ({ story, onUpdate }) => (
  <Card>
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-slate-800">{story.title}</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">
            {story.story_type?.replace('_', ' ')}
          </span>
        </div>
        {story.content && <div className="text-sm text-slate-600 mb-2 line-clamp-2">{story.content}</div>}
        {story.platform?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {story.platform.map((p, i) => (
              <span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600">{p}</span>
            ))}
          </div>
        )}
      </div>
      <StyledSelect
        value={story.status}
        onChange={(e) => onUpdate({ ...story, status: e.target.value })}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'review', label: 'Review' },
          { value: 'approved', label: 'Approved' },
          { value: 'published', label: 'Published' },
        ]}
      />
    </div>
  </Card>
)

// Add Task Modal
const AddTaskModal = ({ onClose, onAdd }) => {
  const [task, setTask] = useState({
    title: '',
    category: 'general',
    due_date: new Date().toISOString().split('T')[0],
    priority: 'medium',
    status: 'pending',
  })

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-800">Add Task</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <span className="text-xl">×</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
          <input
            type="date"
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              className="px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              className="px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            >
              <option value="outreach">Outreach</option>
              <option value="donations">Donations</option>
              <option value="volunteers">Volunteers</option>
              <option value="partners">Partners</option>
              <option value="fundraising">Fundraising</option>
              <option value="admin">Admin</option>
              <option value="general">General</option>
            </select>
          </div>
          <button
            onClick={() => {
              if (task.title) {
                onAdd(task)
                onClose()
              }
            }}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-amber-500 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-amber-600 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [data, setData] = useState({
    recipients: [], donations: [], donors: [], volunteers: [],
    partners: [], outreach_events: [], tasks: [], impact_stories: [],
    grants: [], media: []
  })
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState({})
  const [showAddTask, setShowAddTask] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    if (!supabase) { setLoading(false); return }
    try {
      const [recipientsRes, donationsRes, donorsRes, volunteersRes, partnersRes, eventsRes, tasksRes, storiesRes, grantsRes, mediaRes, settingsRes] = await Promise.all([
        supabase.from('recipients').select('*').order('created_at', { ascending: false }),
        supabase.from('donations').select('*').order('date', { ascending: false }),
        supabase.from('donors').select('*').order('name'),
        supabase.from('volunteers').select('*').order('name'),
        supabase.from('partners').select('*').order('name'),
        supabase.from('outreach_events').select('*').order('date'),
        supabase.from('tasks').select('*').order('due_date'),
        supabase.from('impact_stories').select('*').order('created_at', { ascending: false }),
        supabase.from('grants').select('*').order('deadline'),
        supabase.from('media').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*').eq('key', 'last_updated').single()
      ])
      setData({
        recipients: recipientsRes.data || [], donations: donationsRes.data || [],
        donors: donorsRes.data || [], volunteers: volunteersRes.data || [],
        partners: partnersRes.data || [], outreach_events: eventsRes.data || [],
        tasks: tasksRes.data || [], impact_stories: storiesRes.data || [],
        grants: grantsRes.data || [], media: mediaRes.data || []
      })
      if (settingsRes.data?.value?.timestamp) setLastUpdated(new Date(settingsRes.data.value.timestamp))
    } catch (error) { console.error(error) }
    setLoading(false)
  }

  const updateItem = async (table, item) => {
    try {
      const { error } = await supabase.from(table).update(item).eq('id', item.id)
      if (!error) {
        setData(prev => ({ ...prev, [table]: prev[table].map(i => i.id === item.id ? item : i) }))
        await supabase.from('settings').upsert({ key: 'last_updated', value: { timestamp: new Date().toISOString() } })
        setLastUpdated(new Date())
      }
    } catch (error) { console.error(error) }
  }

  const addTask = async (task) => {
    try {
      const { data: newTask, error } = await supabase.from('tasks').insert([task]).select().single()
      if (!error && newTask) setData(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }))
    } catch (error) { console.error(error) }
  }

  const deleteTask = async (id) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id)
      if (!error) setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }))
    } catch (error) { console.error(error) }
  }

  const toggleCollapse = (section) => setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))

  const exportPDF = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const pendingTasksList = data.tasks.filter(t => t.status !== 'completed').sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    const activeRecipients = data.recipients.filter(r => r.status === 'active')
    const upcomingEvents = data.outreach_events.filter(e => new Date(e.date) >= new Date()).slice(0, 5)
    const activeVolunteers = data.volunteers.filter(v => v.status === 'active')
    const totalDonations = data.donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0)

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lucky Day - Executive Summary</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; padding-bottom: 16px; border-bottom: 3px solid #16a34a; }
          .logo { width: 50px; height: 50px; background: linear-gradient(135deg, #16a34a, #fbbf24); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; }
          .header-text h1 { font-size: 24px; color: #0f172a; }
          .header-text p { font-size: 12px; color: #64748b; }
          .date { font-size: 12px; color: #64748b; margin-bottom: 24px; }
          .stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 32px; }
          .stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center; }
          .stat-value { font-size: 24px; font-weight: 700; color: #16a34a; }
          .stat-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
          .section { margin-bottom: 28px; }
          .section-title { font-size: 14px; font-weight: 700; color: #16a34a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #bbf7d0; }
          .item { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
          .item:last-child { border-bottom: none; }
          .item-title { font-weight: 600; color: #0f172a; font-size: 13px; }
          .item-meta { font-size: 11px; color: #64748b; margin-top: 2px; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; text-align: center; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">☀️</div>
          <div class="header-text">
            <h1>Lucky Day</h1>
            <p>Impact Summary</p>
          </div>
        </div>
        <p class="date">Generated: ${today}</p>
        
        <div class="stats">
          <div class="stat"><div class="stat-value">${activeRecipients.length}</div><div class="stat-label">Recipients</div></div>
          <div class="stat"><div class="stat-value">$${totalDonations.toLocaleString()}</div><div class="stat-label">Donated</div></div>
          <div class="stat"><div class="stat-value">${activeVolunteers.length}</div><div class="stat-label">Volunteers</div></div>
          <div class="stat"><div class="stat-value">${data.partners.length}</div><div class="stat-label">Partners</div></div>
          <div class="stat"><div class="stat-value">${pendingTasksList.length}</div><div class="stat-label">Tasks</div></div>
        </div>

        <div class="section">
          <div class="section-title">📋 Pending Tasks</div>
          ${pendingTasksList.slice(0, 10).map(t => `
            <div class="item">
              <div class="item-title">${t.title}</div>
              <div class="item-meta">Due: ${new Date(t.due_date).toLocaleDateString()} • ${t.category}</div>
            </div>
          `).join('') || '<p style="color:#94a3b8;font-style:italic;">No pending tasks</p>'}
        </div>

        <div class="section">
          <div class="section-title">🏠 Active Recipients</div>
          ${activeRecipients.map(r => `
            <div class="item">
              <div class="item-title">${r.name}</div>
              <div class="item-meta">${r.location} • ${r.needs?.join(', ') || 'No specific needs listed'}</div>
            </div>
          `).join('') || '<p style="color:#94a3b8;font-style:italic;">No active recipients</p>'}
        </div>

        <div class="section">
          <div class="section-title">📅 Upcoming Events</div>
          ${upcomingEvents.map(e => `
            <div class="item">
              <div class="item-title">${e.name}</div>
              <div class="item-meta">${new Date(e.date).toLocaleDateString()} • ${e.location}</div>
            </div>
          `).join('') || '<p style="color:#94a3b8;font-style:italic;">No upcoming events</p>'}
        </div>

        <div class="footer">
          Lucky Day • Helping neighbors in need • Generated from Dashboard
        </div>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.onload = () => { printWindow.print() }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="relative">
            <Logo size={64} />
            <div className="absolute inset-0 animate-ping opacity-30"><Logo size={64} /></div>
          </div>
          <p className="mt-4 text-slate-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const pendingTasks = data.tasks.filter(t => t.status !== 'completed')
  const overdueTasks = pendingTasks.filter(t => new Date(t.due_date) < new Date())
  const activeRecipients = data.recipients.filter(r => r.status === 'active')
  const upcomingEvents = data.outreach_events.filter(e => new Date(e.date) >= new Date())
  const activeVolunteers = data.volunteers.filter(v => v.status === 'active')
  const totalDonations = data.donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'recipients', label: 'Recipients', icon: Home },
    { id: 'donations', label: 'Donations', icon: Gift },
    { id: 'donors', label: 'Donors', icon: Heart },
    { id: 'volunteers', label: 'Volunteers', icon: UserCheck },
    { id: 'partners', label: 'Partners', icon: Handshake },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'stories', label: 'Stories', icon: Camera },
    { id: 'grants', label: 'Grants', icon: DollarSign },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Logo size={48} />
              <div>
                <h1 className="text-2xl tracking-tight">
                  <span className="font-bold">LUCKY</span>
                  <span className="font-normal text-amber-400"> DAY</span>
                </h1>
                <p className="text-sm text-slate-500">Helping neighbors in need</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
              >
                <RefreshCw size={16} /> Refresh
              </button>
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
              >
                <Download size={16} /> Export PDF
              </button>
            </div>
          </div>
          
          {lastUpdated && (
            <div className="text-xs text-slate-400 mb-4">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { value: activeRecipients.length, label: 'Recipients', icon: Home, color: 'from-green-500 to-emerald-500' },
              { value: `$${totalDonations.toLocaleString()}`, label: 'Donated', icon: Gift, color: 'from-amber-500 to-yellow-500' },
              { value: activeVolunteers.length, label: 'Volunteers', icon: UserCheck, color: 'from-sky-500 to-blue-500' },
              { value: data.partners.length, label: 'Partners', icon: Handshake, color: 'from-violet-500 to-purple-500' },
              { value: pendingTasks.length, label: 'Tasks', icon: CheckCircle, color: 'from-rose-500 to-pink-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Alert Banner */}
        {overdueTasks.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <span className="text-sm text-red-800 font-medium">
              {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} need attention
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-green-500 to-amber-500 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
          
          {activeTab === 'overview' && (
            <>
              <SectionHeader icon={CheckCircle} title="Action Items" count={pendingTasks.length} onAdd={() => setShowAddTask(true)} collapsed={collapsed.tasks} onToggle={() => toggleCollapse('tasks')} />
              {!collapsed.tasks && (
                <div className="mb-8">
                  {pendingTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).map(task => (
                    <TaskItem key={task.id} task={task} onUpdate={(t) => updateItem('tasks', t)} onDelete={deleteTask} />
                  ))}
                  {pendingTasks.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No pending tasks 🎉</p>}
                </div>
              )}
              <SectionHeader icon={Home} title="Active Recipients" count={activeRecipients.length} collapsed={collapsed.recipients} onToggle={() => toggleCollapse('recipients')} />
              {!collapsed.recipients && (
                <div className="mb-8">
                  {activeRecipients.map(r => <RecipientItem key={r.id} recipient={r} onUpdate={(item) => updateItem('recipients', item)} />)}
                  {activeRecipients.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No active recipients</p>}
                </div>
              )}
              <SectionHeader icon={Calendar} title="Upcoming Events" count={upcomingEvents.length} collapsed={collapsed.events} onToggle={() => toggleCollapse('events')} />
              {!collapsed.events && (
                <div>
                  {upcomingEvents.slice(0, 5).map(e => <EventItem key={e.id} event={e} onUpdate={(item) => updateItem('outreach_events', item)} />)}
                  {upcomingEvents.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No upcoming events</p>}
                </div>
              )}
            </>
          )}

          {activeTab === 'recipients' && (
            <>
              <SectionHeader icon={Home} title="All Recipients" count={data.recipients.length} />
              {data.recipients.map(r => <RecipientItem key={r.id} recipient={r} onUpdate={(item) => updateItem('recipients', item)} />)}
              {data.recipients.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No recipients yet.</p>}
            </>
          )}

          {activeTab === 'donors' && (
            <>
              <SectionHeader icon={Heart} title="Donors" count={data.donors.length} />
              {data.donors.map(d => <DonorItem key={d.id} donor={d} onUpdate={(item) => updateItem('donors', item)} />)}
              {data.donors.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No donors yet.</p>}
            </>
          )}

          {activeTab === 'volunteers' && (
            <>
              <SectionHeader icon={UserCheck} title="Volunteers" count={data.volunteers.length} />
              {data.volunteers.map(v => <VolunteerItem key={v.id} volunteer={v} onUpdate={(item) => updateItem('volunteers', item)} />)}
              {data.volunteers.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No volunteers yet.</p>}
            </>
          )}

          {activeTab === 'partners' && (
            <>
              <SectionHeader icon={Handshake} title="Partner Organizations" count={data.partners.length} />
              {data.partners.map(p => <PartnerItem key={p.id} partner={p} onUpdate={(item) => updateItem('partners', item)} />)}
              {data.partners.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No partners yet.</p>}
            </>
          )}

          {activeTab === 'events' && (
            <>
              <SectionHeader icon={Calendar} title="Outreach Events" count={data.outreach_events.length} />
              {data.outreach_events.map(e => <EventItem key={e.id} event={e} onUpdate={(item) => updateItem('outreach_events', item)} />)}
              {data.outreach_events.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No events yet.</p>}
            </>
          )}

          {activeTab === 'stories' && (
            <>
              <SectionHeader icon={Camera} title="Impact Stories" count={data.impact_stories.length} />
              {data.impact_stories.map(s => <StoryItem key={s.id} story={s} onUpdate={(item) => updateItem('impact_stories', item)} />)}
              {data.impact_stories.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No stories yet.</p>}
            </>
          )}

          {activeTab === 'grants' && (
            <>
              <SectionHeader icon={DollarSign} title="Grants & Funding" count={data.grants.length} />
              {data.grants.map(g => <GrantItem key={g.id} grant={g} onUpdate={(item) => updateItem('grants', item)} />)}
              {data.grants.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No grants yet.</p>}
            </>
          )}

          {activeTab === 'donations' && (
            <>
              <SectionHeader icon={Gift} title="Recent Donations" count={data.donations.length} />
              {data.donations.map(d => (
                <Card key={d.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-emerald-600">${d.amount}</div>
                      <div className="text-sm text-slate-500">
                        {d.donor_anonymous ? 'Anonymous' : d.donor_name || 'Unknown'} • {d.donation_type} • {d.platform}
                      </div>
                      <div className="text-xs text-slate-400">{new Date(d.date).toLocaleDateString()}</div>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                </Card>
              ))}
              {data.donations.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No donations yet.</p>}
            </>
          )}
        </div>
      </div>

      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} onAdd={addTask} />}
    </div>
  )
}
