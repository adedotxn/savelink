import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // LATER: error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <div>
            {this.props.fallback ? <p>{this.props.fallback}</p> : <></>}
            {this.props.error ? <p>{this.props.error}</p> : <></>}

            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
