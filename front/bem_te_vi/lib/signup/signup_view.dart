import 'package:flutter/material.dart';
import 'signup_controller.dart';

class SignupView extends StatefulWidget {
  @override
  SignupViewState createState() => SignupViewState();
}

class SignupViewState extends State<SignupView> {
  final _controller = SignupController();
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isLoading = false;
  String? _errorMessage, _message;

  void _signup() async {
    if (!_formKey.currentState!.validate()) {
      return; // Stop if validation fails
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _message = null;
    });

    final username = _usernameController.text;
    final email = _emailController.text;
    final password = _passwordController.text;

    try {
      final accessToken = await _controller.signup(email, username, password);

      setState(() {
        _isLoading = false;
        if (accessToken != null) {
          _message = "Cadastro realizado com sucesso!";
          Navigator.pushReplacementNamed(context, '/');
        }
      });
    } on Exception catch (e) {
      setState(() {
        _isLoading = false;
        _errorMessage = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Cadastro')),
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _buildTextField(
                    controller: _usernameController,
                    label: 'Nome de usuário',
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Por favor, insira seu nome de usuário';
                      }
                      return null;
                    }
                  ),
                  SizedBox(height: 16),
                  _buildTextField(
                    controller: _emailController,
                    label: 'Email',
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Por favor, insira seu email';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  _buildTextField(
                    controller: _passwordController,
                    label: 'Senha',
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Por favor, insira sua senha';
                      } else if (value.length < 6) {
                        return 'Sua senha deve ter pelo menos 6 caracteres';
                      }
                      return null;
                    }
                  ),
                  SizedBox(height: 20),
                  if (_isLoading) CircularProgressIndicator(),
                  if (_errorMessage != null)
                    Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
                  if (_message != null)
                    Text(_message!, style: const TextStyle(color: Colors.green)),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _signup,
                    child: Text("Cadastrar-se")
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(), // Add a border to the text field
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Theme.of(context).primaryColor, width: 2.0),
        ),
      ),
      obscureText: obscureText,
      validator: validator,
    );
  }
}
