const AgentStatus = ({ status }) => {
    return (
      <div className="agent-status">
        <h2>RL Agent Status: {status}</h2>
        <button className="agent-button">
          &#9654; Start Agent {/* Unicode character for play symbol */}
        </button>
        <button className="agent-button">
          &#9632; Stop Agent {/* Unicode character for stop symbol */}
        </button>
        <button className="agent-button">
          &#8635; Reset Agent {/* Unicode character for reset symbol */}
        </button>
      </div>
    );
  };
  
  export default AgentStatus;