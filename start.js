const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

// Colors for console output
const colors = {
    server: '\x1b[36m', // Cyan
    python: '\x1b[35m', // Magenta
    frontend: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m'  // Reset
};

// Helper function to create a process
function startProcess(command, args, name, color) {
    const process = spawn(command, args, {
        stdio: 'pipe',
        shell: true
    });

    process.stdout.on('data', (data) => {
        console.log(`${color}[${name}]: ${data}${colors.reset}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`${colors.error}[${name} ERROR]: ${data}${colors.reset}`);
    });

    process.on('close', (code) => {
        if (code !== 0) {
            console.log(`${colors.error}[${name}] process exited with code ${code}${colors.reset}`);
        }
    });

    return process;
}

// Function to check if python is available
async function checkPython() {
    try {
        const pythonProcess = spawn('python', ['--version']);
        return new Promise((resolve) => {
            pythonProcess.on('close', (code) => {
                resolve(code === 0);
            });
        });
    } catch (error) {
        return false;
    }
}

// Function to check if MongoDB is running
async function checkMongoDB() {
    try {
        const mongoProcess = spawn('mongod', ['--version']);
        return new Promise((resolve) => {
            mongoProcess.on('close', (code) => {
                resolve(code === 0);
            });
        });
    } catch (error) {
        return false;
    }
}

// Main startup function
async function startApplication() {
    console.log('Starting LIMS Application...');

    // Check prerequisites
    const isPythonAvailable = await checkPython();
    if (!isPythonAvailable) {
        console.error(`${colors.error}Python is not available. Please install Python 3.7 or higher.${colors.reset}`);
        process.exit(1);
    }

    const isMongoAvailable = await checkMongoDB();
    if (!isMongoAvailable) {
        console.error(`${colors.error}MongoDB is not available. Please install and start MongoDB.${colors.reset}`);
        process.exit(1);
    }

    // Start Node.js server
    const serverProcess = startProcess(
        'node',
        ['server.js'],
        'Server',
        colors.server
    );

    // Start Python processor
    const pythonProcess = startProcess(
        'python',
        ['data_processor.py'],
        'Python',
        colors.python
    );

    // Start React frontend
    const frontendProcess = startProcess(
        'npm',
        ['start'],
        'Frontend',
        colors.frontend,
        { cwd: path.join(__dirname, 'client') }
    );

    // Handle process termination
    const processes = [serverProcess, pythonProcess, frontendProcess];

    process.on('SIGINT', () => {
        console.log('\nShutting down LIMS application...');
        processes.forEach(proc => proc.kill());
        process.exit(0);
    });
}

// Start the application
startApplication().catch(error => {
    console.error(`${colors.error}Failed to start application: ${error}${colors.reset}`);
    process.exit(1);
});
