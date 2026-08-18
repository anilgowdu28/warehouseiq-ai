import { useMemo, useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Sparkles, ClipboardList, Box,
  ShieldCheck, Truck, AlertTriangle, BarChart3, FileText, Settings,
  Search, Bell, Moon, Send, CheckCircle2, Zap, ArrowRight, X, Bot
} from "lucide-react";

const inventory = [
  {sku:"WM-101",name:"Wireless Mouse",stock:7,reserved:5,reorder:20},
  {sku:"KB-205",name:"Mechanical Keyboard",stock:42,reserved:18,reorder:15},
  {sku:"MN-301",name:"24-inch Monitor",stock:4,reserved:3,reorder:10},
  {sku:"UH-401",name:"USB-C Hub",stock:76,reserved:21,reorder:25},
  {sku:"HD-502",name:"External SSD 1TB",stock:0,reserved:0,reorder:15},
];

const seedOrders = [
  {id:"ORD-1001",priority:"High",customer:"TechStore Pvt. Ltd.",items:8,status:"Picking",eta:"Today, 2:00 PM"},
  {id:"ORD-1002",priority:"Medium",customer:"Gadget Hub",items:5,status:"Packing",eta:"Today, 4:30 PM"},
  {id:"ORD-1003",priority:"High",customer:"QuickMart",items:12,status:"Allocated",eta:"Tomorrow, 11:00 AM"},
  {id:"ORD-1004",priority:"Low",customer:"Retailers United",items:3,status:"Pending",eta:"Tomorrow, 3:00 PM"},
  {id:"ORD-1005",priority:"Medium",customer:"ElectroMax",items:7,status:"Inventory Check",eta:"Today, 6:00 PM"},
];

const exceptions = [
  {level:"Critical",title:"Wireless Mouse shortage",text:"ORD-1006 needs 10 units; only 7 are available."},
  {level:"Warning",title:"Picking Zone B bottleneck",text:"Average processing time is 18 minutes vs 12 minute target."},
  {level:"Warning",title:"12 SKUs need reorder",text:"Several products are projected to stock out within 3–5 days."},
];

const nav = [
 ["Dashboard",LayoutDashboard],["Inventory",Package],["Orders",ShoppingCart],
 ["AI Copilot",Sparkles],["Decision Engine",Bot],["Picking",ClipboardList],
 ["Packing",Box],["Quality Check",ShieldCheck],["Dispatch",Truck],
 ["Exceptions",AlertTriangle],["Analytics",BarChart3],["Reports",FileText],["Settings",Settings]
];

function App(){
  const [page,setPage]=useState("Dashboard");
  const [orders,setOrders]=useState(seedOrders);
  const [copilotOpen,setCopilotOpen]=useState(true);
  const [toast,setToast]=useState("");
  const [dark,setDark]=useState(false);

  const notify=(m)=>{setToast(m);setTimeout(()=>setToast(""),2500)};
  const advance=(id)=>{
    const flow=["Pending","Inventory Check","Allocated","Picking","Packing","Quality Check","Ready","Dispatched"];
    setOrders(xs=>xs.map(o=>{
      if(o.id!==id)return o;
      const i=Math.max(0,flow.indexOf(o.status));
      return {...o,status:flow[Math.min(i+1,flow.length-1)]};
    }));
    notify(`${id} advanced to the next fulfillment stage.`);
  };

  return <div className={`app ${dark?"dark":""}`}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Box size={21}/></div><div><b>Warehouse<span>IQ</span></b><small>AI Operations Platform</small></div></div>
      <div className="menu-label">OPERATIONS</div>
      <nav>{nav.map(([n,I])=><button key={n} className={`nav ${page===n?"active":""}`} onClick={()=>setPage(n)}>
        <I size={17}/><span>{n}</span>{n==="AI Copilot"&&<em>AI</em>}{n==="Exceptions"&&<i>3</i>}
      </button>)}</nav>
      <div className="sidebar-ai"><Sparkles size={16}/><div><b>AI Monitoring</b><small>Active • analyzing warehouse</small></div></div>
      <div className="profile"><div className="avatar">A</div><div><b>Arjun Patel</b><small>Warehouse Manager</small></div></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><h1>{page}</h1><p>{page==="Dashboard"?"AI-powered warehouse command center":"Warehouse intelligence and operations"}</p></div>
        <div className="top-actions"><div className="search"><Search size={16}/><input placeholder="Ask AI or search warehouse..."/></div><button className="round" onClick={()=>notify("3 AI alerts need your attention.")}><Bell size={18}/><i>3</i></button><button className="round" onClick={()=>setDark(!dark)}><Moon size={18}/></button></div>
      </header>

      {page==="Dashboard"&&<Dashboard orders={orders} onAdvance={advance} onNotify={notify} onCopilot={()=>setCopilotOpen(true)}/>}
      {page==="Inventory"&&<InventoryPage onNotify={notify}/>}
      {page==="Orders"&&<OrdersPage orders={orders} onAdvance={advance} onNotify={notify}/>}
      {page==="AI Copilot"&&<CopilotPage onNotify={notify}/>}
      {page==="Decision Engine"&&<DecisionPage onNotify={notify}/>}
      {["Picking","Packing","Quality Check","Dispatch"].includes(page)&&<WorkflowPage page={page} orders={orders} onAdvance={advance}/>}
      {page==="Exceptions"&&<ExceptionsPage onNotify={notify}/>}
      {page==="Analytics"&&<AnalyticsPage/>}
      {page==="Reports"&&<ReportsPage/>}
      {page==="Settings"&&<SettingsPage/>}

      {copilotOpen&&<CopilotDrawer onClose={()=>setCopilotOpen(false)} onNotify={notify}/>}
      {!copilotOpen&&<button className="floating-ai" onClick={()=>setCopilotOpen(true)}><Sparkles size={19}/><span>Ask Warehouse AI</span></button>}
      {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </main>
  </div>
}

function Dashboard({orders,onAdvance,onNotify,onCopilot}){
 return <div className="content">
  <div className="hero"><div><span>AI COMMAND CENTER</span><h2>Good morning, Arjun.</h2><p>WarehouseIQ analyzed today's activity and found <b>3 decisions</b> that need attention.</p></div><button className="primary" onClick={onCopilot}><Sparkles size={16}/>Ask AI Manager</button></div>
  <div className="ai-brief"><div className="brief-icon"><Sparkles/></div><div><small>AI DAILY BRIEF</small><h3>Fulfillment is healthy, but inventory risk is rising.</h3><p>1 urgent shortage, 1 picking bottleneck and 12 SKUs need replenishment.</p></div><button onClick={onCopilot}>Explain <ArrowRight size={15}/></button></div>
  <div className="kpis">
   <Kpi title="Total Orders" value="128" change="12% vs yesterday" icon={<ShoppingCart/>}/><Kpi title="Orders in Progress" value="42" change="8% vs yesterday" icon={<Box/>}/><Kpi title="Shipped Today" value="86" change="15% vs yesterday" icon={<Truck/>}/><Kpi title="AI Exceptions" value="3" change="Requires decision" warn icon={<AlertTriangle/>}/><Kpi title="Low Stock Items" value="12" change="Reorder recommended" warn icon={<Package/>}/>
  </div>
  <div className="grid">
   <section className="panel"><Title title="AI Recommended Actions" sub="Prioritized by impact and urgency"/><AiAction title="Resolve Wireless Mouse shortage" detail="Allocate 7 units to ORD-1006 and trigger replenishment." score="94" button="Apply" onClick={()=>onNotify("AI allocation applied: 7 units reserved for ORD-1006.")}/><AiAction title="Fix Picking Zone B bottleneck" detail="Move 2 pickers from Zone A to Zone B." score="88" button="Optimize" onClick={()=>onNotify("Picker redistribution recommendation applied.")}/><AiAction title="Reorder 12 low-stock SKUs" detail="Recommended purchase quantity: 50 Wireless Mouse units." score="82" button="Reorder" onClick={()=>onNotify("Purchase request created for recommended replenishment.")}/></section>
   <section className="panel"><Title title="Fulfillment Intelligence" sub="Live operational signal"/><Flow/><div className="signal"><div className="signal-dot"></div><div><b>AI confidence 94%</b><p>Decision engine has enough data to recommend action.</p></div></div></section>
  </div>
  <div className="grid lower"><section className="panel"><Title title="Recent Orders" action="View all" onClick={()=>onNotify("Open Orders from the sidebar.")}/><OrderTable orders={orders} onAdvance={onAdvance}/></section><section className="panel"><Title title="What AI is watching" sub="Continuous monitoring"/>{exceptions.map((x,i)=><div className="watch" key={i}><div className={x.level==="Critical"?"red-dot":"yellow-dot"}></div><div><b>{x.title}</b><p>{x.text}</p></div></div>)}</section></div>
 </div>
}
function Kpi({title,value,change,icon,warn}){return <div className="kpi"><div className={`kpi-icon ${warn?"warn":""}`}>{icon}</div><small>{title}</small><h2>{value}</h2><span className={warn?"bad":"good"}>{warn?"● ":"▲ "}{change}</span></div>}
function Title({title,sub,action,onClick}){return <div className="title"><div><h3>{title}</h3>{sub&&<p>{sub}</p>}</div>{action&&<button onClick={onClick}>{action}</button>}</div>}
function AiAction({title,detail,score,button,onClick}){return <div className="ai-action"><div className="spark"><Sparkles size={16}/></div><div className="ai-action-text"><b>{title}</b><p>{detail}</p></div><span>{score}%</span><button onClick={onClick}>{button}</button></div>}
function Flow(){return <div className="mini-flow">{["Created","Checked","Allocated","Picking","Packing","Shipped"].map((x,i)=><div key={x}><div className={i<4?"done":""}>{i<4?<CheckCircle2 size={15}/>:i+1}</div><span>{x}</span>{i<5&&<i/>}</div>)}</div>}
function OrderTable({orders,onAdvance}){return <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>PRIORITY</th><th>CUSTOMER</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{orders.slice(0,5).map(o=><tr key={o.id}><td className="blue">{o.id}</td><td><span className={`priority ${o.priority.toLowerCase()}`}>{o.priority}</span></td><td>{o.customer}</td><td><span className="status">{o.status}</span></td><td><button className="tiny" onClick={()=>onAdvance(o.id)}>Advance</button></td></tr>)}</tbody></table></div>}

function InventoryPage({onNotify}){return <div className="content"><Hero eyebrow="AI INVENTORY" title="Inventory Intelligence" sub="AI detects stock risk and recommends replenishment."/><section className="panel"><Title title="Stock with AI risk assessment" sub="Current warehouse inventory"/><div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>AVAILABLE</th><th>RESERVED</th><th>REORDER</th><th>AI RISK</th><th>ACTION</th></tr></thead><tbody>{inventory.map(x=><tr key={x.sku}><td><b>{x.name}</b><small className="sub">{x.sku}</small></td><td><b>{x.stock}</b></td><td>{x.reserved}</td><td>{x.reorder}</td><td><span className={`risk ${x.stock===0?"critical":x.stock<x.reorder?"high":"healthy"}`}>{x.stock===0?"Critical":x.stock<x.reorder?"High":"Healthy"}</span></td><td><button className="tiny" onClick={()=>onNotify(x.stock<x.reorder?`AI recommends reordering ${x.name}.`:`${x.name} is healthy.`)}>Ask AI</button></td></tr>)}</tbody></table></div></section></div>}
function OrdersPage({orders,onAdvance,onNotify}){return <div className="content"><Hero eyebrow="AI ORDER MANAGEMENT" title="Orders" sub="AI-ranked order queue with explainable priorities."/><section className="panel"><Title title="Priority queue" sub="Orders are ranked by urgency, SLA, customer priority and inventory availability."/><OrderTable orders={orders} onAdvance={onAdvance}/></section></div>}
function DecisionPage({onNotify}){const [applied,setApplied]=useState(false);return <div className="content"><Hero eyebrow="DECISION INTELLIGENCE" title="AI Decision Engine" sub="WarehouseIQ reasons over inventory, urgency and operational constraints."/><div className="grid decision"><section className="panel"><div className="decision-head"><div className="ai-circle"><Sparkles/></div><div><small>AI DETECTED CONFLICT</small><h2>ORD-1006 • Wireless Mouse</h2><p>Urgent order requires 10 units. Available inventory: 7.</p></div><span className="priority high">Urgent</span></div><div className="versus"><div><small>REQUIRED</small><b>10</b><span>units</span></div><strong>VS</strong><div><small>AVAILABLE</small><b className="red">7</b><span>units</span></div></div><div className="recommend"><Sparkles/><div><small>AI RECOMMENDATION</small><h3>Allocate 7 units to ORD-1006</h3><p>Protect the urgent order, mark 3 units as shortage, and create a replenishment action. Lower-priority demand should wait.</p></div></div><div className="actions"><button className="primary" onClick={()=>{setApplied(true);onNotify("AI decision applied successfully.")}}><Zap size={16}/>{applied?"Applied":"Apply AI Decision"}</button><button className="secondary">Override</button></div></section><section className="panel"><Title title="Why this decision?" sub="Explainable AI factors"/>{[["Urgency","40%","High"],["Customer SLA","25%","High"],["Order Age","20%","Medium"],["Inventory Scarcity","15%","Critical"]].map(x=><div className="factor" key={x[0]}><div><b>{x[0]}</b><small>{x[1]} weight</small></div><span>{x[2]}</span></div>)}<div className="score"><small>AI PRIORITY SCORE</small><b>94 / 100</b></div></section></div></div>}
function WorkflowPage({page,orders,onAdvance}){const o=orders[1];const stages=["Created","Checked","Allocated","Picking","Packing","Quality Check","Dispatched"];return <div className="content"><Hero eyebrow="AI FULFILLMENT" title={page} sub="AI-guided execution of the order fulfillment lifecycle."/><section className="panel"><div className="workflow-head"><div><small>ACTIVE ORDER</small><h2>{o.id}</h2><p>{o.customer} • {o.items} items</p></div><span className={`priority ${o.priority.toLowerCase()}`}>{o.priority}</span></div><div className="timeline">{stages.map((s,i)=><div className={i<=3?"done":""} key={s}><div>{i<=3?<CheckCircle2 size={16}/>:i+1}</div><span>{s}</span>{i<6&&<i/>}</div>)}</div><button className="primary" onClick={()=>onAdvance(o.id)}><CheckCircle2 size={16}/>Complete Current Step</button></section></div>}
function ExceptionsPage({onNotify}){return <div className="content"><Hero eyebrow="AI EXCEPTION CENTER" title="Exceptions" sub="AI converts warehouse exceptions into resolution plans."/><div className="cards">{exceptions.map(x=><section className="panel" key={x.title}><div className="exception-row"><div className={x.level==="Critical"?"ex critical":"ex warning"}><AlertTriangle size={18}/></div><div><small>{x.level}</small><h3>{x.title}</h3><p>{x.text}</p></div></div><div className="resolution"><Sparkles size={15}/><span><b>AI resolution:</b> investigate, recommend replacement/allocation, then update order state.</span></div><button className="secondary" onClick={()=>onNotify(`AI resolution workflow started for ${x.title}.`)}>Start AI Resolution <ArrowRight size={15}/></button></section>)}</div></div>}
function AnalyticsPage(){return <div className="content"><Hero eyebrow="AI ANALYTICS" title="Operational Intelligence" sub="AI highlights trends and bottlenecks instead of just charting them."/><div className="kpis four"><Kpi title="Fulfillment Rate" value="91.4%" change="5.2% improvement" icon={<Truck/>}/><Kpi title="Avg Processing" value="18m" change="8.4% faster" icon={<ClipboardList/>}/><Kpi title="Picking Efficiency" value="87%" change="6.1% improvement" icon={<Zap/>}/><Kpi title="Exception Rate" value="4.7%" change="2.3% lower" icon={<AlertTriangle/>}/></div><div className="grid"><section className="panel chart"><Title title="Warehouse performance" sub="Last 7 days"/><div className="chart-bars">{[72,78,74,84,81,89,94].map((v,i)=><div key={i}><b>{v}%</b><span style={{height:v*1.8}}></span><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}</div></section><section className="panel insight"><Sparkles/><small>AI INSIGHT</small><h2>Picking Zone B is the bottleneck.</h2><p>Its average processing time is 18 minutes, 50% above target. Moving 2 pickers from Zone A is the recommended intervention.</p></section></div></div>}
function ReportsPage(){return <div className="content"><Hero eyebrow="AI REPORTING" title="Reports" sub="Generate operational summaries with AI explanations."/><div className="cards">{["Daily AI Brief","Inventory Risk Report","Exception Root-Cause Summary","Dispatch Performance"].map(x=><section className="panel report" key={x}><FileText/><h3>{x}</h3><p>Ready to generate from current warehouse state.</p><button className="secondary">Generate <ArrowRight size={15}/></button></section>)}</div></div>}
function SettingsPage(){return <div className="content"><Hero eyebrow="SYSTEM" title="Settings" sub="WarehouseIQ AI configuration."/><section className="panel"><div className="setting"><div><h3>AI Decision Mode</h3><p>AI recommends actions; humans approve operational changes.</p></div><b className="enabled">ENABLED</b></div><div className="setting"><div><h3>Explainable Recommendations</h3><p>Show factors and reasoning behind each recommendation.</p></div><b className="enabled">ON</b></div></section></div>}
function Hero({eyebrow,title,sub}){return <div className="hero simple"><div><span>{eyebrow}</span><h2>{title}</h2><p>{sub}</p></div></div>}

function CopilotPage({onNotify}){return <div className="content"><Hero eyebrow="WAREHOUSE AI" title="AI Copilot" sub="Ask questions about inventory, orders, bottlenecks and decisions."/><section className="panel big-chat"><CopilotInner onNotify={onNotify}/></section></div>}

function CopilotDrawer({onClose,onNotify}){
 return <aside className="copilot"><div className="copilot-head"><div className="ai-brand"><div><Sparkles size={17}/></div><span><b>Warehouse AI</b><small>Decision Copilot</small></span></div><button onClick={onClose}><X size={18}/></button></div><CopilotInner onNotify={onNotify}/></aside>
}

function CopilotInner({onNotify}){
 const [messages,setMessages]=useState([{role:"ai",text:"Hi Arjun. I’m monitoring your warehouse. Ask me what to prioritize, where the bottlenecks are, or what inventory to reorder."}]);
 const [input,setInput]=useState("");
 const [loading,setLoading]=useState(false);
 const quick=["What should I do first?","Why is ORD-1006 urgent?","Which products need reorder?","Find bottlenecks"];
 const send=async(text=input)=>{
   const q=text.trim(); if(!q||loading)return;
   setMessages(m=>[...m,{role:"user",text:q}]);setInput("");setLoading(true);
   try{
     const r = await fetch("https://warehouseiq-ai-1.onrender.com/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: q,
    warehouse: { inventory, orders: seedOrders, exceptions }
  })
});const data=await r.json();
     setMessages(m=>[...m,{role:"ai",text:data.answer||"I couldn't generate a recommendation."}]);
   }catch(e){
     const fallback=q.toLowerCase().includes("reorder")
       ?"Prioritize Wireless Mouse and External SSD. Wireless Mouse has 7 available against a reorder level of 20; External SSD is out of stock. I recommend a 50-unit mouse replenishment and immediate SSD replenishment."
       :q.toLowerCase().includes("bottleneck")
       ?"Picking Zone B is the current bottleneck: 18 minutes average versus a 12-minute target. Move 2 pickers from Zone A to Zone B."
       :"ORD-1006 should be first. It is urgent, needs 10 Wireless Mouse units, and only 7 are available. Allocate the 7 units, mark 3 as shortage, and trigger replenishment.";
     setMessages(m=>[...m,{role:"ai",text:fallback}]);
     onNotify("AI demo mode responded. Add OPENAI_API_KEY for live model responses.");
   }finally{setLoading(false)}
 };
 return <div className="chat-inner"><div className="quick">{quick.map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div><div className="messages">{messages.map((m,i)=><div className={`msg ${m.role}`} key={i}><div className="msg-icon">{m.role==="ai"?<Sparkles size={13}/>:<span>A</span>}</div><p>{m.text}</p></div>)}{loading&&<div className="msg ai"><div className="msg-icon"><Sparkles size={13}/></div><p className="typing">Analyzing warehouse state…</p></div>}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Warehouse AI…"/><button onClick={()=>send()}><Send size={16}/></button></div><small className="chat-note">AI recommendations are advisory. Warehouse actions require operator approval.</small></div>
}

export default App;
